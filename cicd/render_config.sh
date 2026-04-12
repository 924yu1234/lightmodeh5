#!/usr/bin/env bash

APP_ENV_DIR=/usr/local/app/env
OUTPUT_DIR=/etc/app
TMP_DIR=/tmp/config_conversion

mkdir -p $OUTPUT_DIR
mkdir -p $TMP_DIR

# 在改變目錄之前獲取腳本的絕對路徑
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONVERTER_SCRIPT="$SCRIPT_DIR/config_converter.py"

POD_INDEX=$(echo "$HOSTNAME" | awk -F'-' '{print $NF}')
if [[ $POD_INDEX =~ ^[0-9]+$ ]]; then
  export POD_INDEX
  echo POD_INDEX: "$POD_INDEX"
else
  unset POD_INDEX
fi

# 使用現有的 APP_NAME 環境變數
if [[ -z "$APP_NAME" ]]; then
  echo "Warning: APP_NAME environment variable is not set"
fi
echo "SERVICE_NAME: $APP_NAME"

convert_config() {
  local ENV_FILE=$1
  local TPL_FILE=$2
  local CONVERTED_ENV_FILE=$3
  local CONVERTED_TPL_FILE=$4
  
  echo "Converting config files with service: $APP_NAME"
  echo "  ENV: $ENV_FILE -> $CONVERTED_ENV_FILE"
  echo "  TPL: $TPL_FILE -> $CONVERTED_TPL_FILE"
  
  # 使用 Python 腳本進行轉換
  python3 "$CONVERTER_SCRIPT" \
    --input-env "$ENV_FILE" \
    --output-env "$CONVERTED_ENV_FILE" \
    --input-tpl "$TPL_FILE" \
    --output-tpl "$CONVERTED_TPL_FILE" \
    --service-name "$APP_NAME"
    
  if [ $? -ne 0 ]; then
    echo "Error: Config conversion failed"
    exit 1
  fi
}

render() {
  local FROM_FILE=$1
  local TO_FILE=$2
  local APP_CONFIG=$APP_ENV_DIR/app-config
  local APP_SECRET=$APP_ENV_DIR/app-secret
  local TMP_ENV=$TMP_DIR/env.tmp
  local CONVERTED_CONFIG=$TMP_DIR/app-config-converted
  local CONVERTED_TPL=$TMP_DIR/$(basename "$FROM_FILE")
  
  echo "------------Rendering $FROM_FILE to $TO_FILE------------"
  
  # 合併原始配置文件 (app-config + app-secret)
  cat "$APP_CONFIG" "$APP_SECRET" > "$TMP_DIR/merged-config-original"
  
  # 執行配置轉換
  convert_config \
    "$TMP_DIR/merged-config-original" \
    "$FROM_FILE" \
    "$CONVERTED_CONFIG" \
    "$CONVERTED_TPL"
  
  # 創建最終的環境變數文件 (包含 POD_INDEX)
  cp "$CONVERTED_CONFIG" "$TMP_ENV"
  {
    echo -e "\n#------------AUTO Generated------------"
    echo "POD_INDEX=$POD_INDEX"
    echo "#------------AUTO Generated------------"
  } >>"$TMP_ENV"
  
  # 使用轉換後的文件進行 j2 渲染，未定義變數顯示調試信息
  j2 -f env --undefined "$CONVERTED_TPL" "$TMP_ENV" -o "$TO_FILE"
  
  if [ $? -ne 0 ]; then
    echo "Error: j2 rendering failed"
    exit 1
  fi
  
  echo "Rendered successfully: $TO_FILE"
}

# 確保 Python 腳本存在
if [ ! -f "$CONVERTER_SCRIPT" ]; then
  echo "Error: Config converter script not found: $CONVERTER_SCRIPT"
  exit 1
fi

cd $APP_ENV_DIR || exit

find /etc/app/templates -type f -name "*.tpl" | while read -r TPL_FILE; do
  TO_FILE="$OUTPUT_DIR/$(basename "$TPL_FILE" .tpl)"
  render "$TPL_FILE" "$TO_FILE"
done

echo OUTPUT_DIR: $OUTPUT_DIR
ls -al $OUTPUT_DIR

# 清理臨時文件
echo "Cleaning up temporary files..."
rm -rf $TMP_DIR
echo "Done!"
