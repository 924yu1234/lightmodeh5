#!/bin/bash

# 检查是否有输入
if [ -z "$SERVICES" ]; then
  echo "请提供一个字符串。用法: $0 string"
  exit 1
fi

# 使用 IFS（内部字段分隔符）和 read 命令来拆分字符串
# 如果没有逗号，这将处理为单个字符串
IFS=',' read -ra ADDR <<<"$SERVICES"
CURRENT_DIR=$(
  cd "$(dirname "$0")"
  pwd
)
set -eux
# 对每个拆分后的元素使用 echo 命令
for i in "${ADDR[@]}"; do
  cd "$CURRENT_DIR"

  if [[ "$CICD_DIR_PREFIX" = "" ]]; then
    echo "CICD_DIR_PREFIX is set to \"\""
    CICD_DIR='.'
    # 根目录 .gitlab-ci.yml 的 variables 已经设置了环境变量
    cd ..
    mkdir -p build
    cd cicd || exit 
    ./build.sh
  else
    CICD_DIR=$(awk -v k="$i" '$1 == k { print $2; exit }' service_to_dir.properties)
    echo "CICD_DIR: $CICD_DIR"
    if [ -z "$CICD_DIR" ]; then
      CICD_DIR=$i
    fi
    . ./loadEnv.sh ../"$CICD_DIR"
    echo "============== build $CICD_DIR ..... =============="
    cd ../"${CICD_DIR}"
    mkdir -p build
    cd cicd
    ./build.sh
    echo "============== build $CICD_DIR completed =============="
  fi
done
