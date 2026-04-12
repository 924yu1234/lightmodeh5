#!/bin/bash
# 设置YAML文件的路径
yaml_file="$1/.gitlab-ci.yml"
export SERVICE_NAME=""
export SERVICE_VERSION=""
export CICD_DIR_PREFIX=""
export CODE_DIR=""

# 从YAML文件中提取variables部分并设置环境变量
while read -r line; do
    if [[ $line =~ ^[[:space:]]*([^:]+):[[:space:]]*\"(.+)\" ]]; then
        var_name=${BASH_REMATCH[1]}
        var_value=${BASH_REMATCH[2]}
        eval export $var_name=$var_value
    fi
done < <(awk '/variables:/{flag=1; next} /default:/{flag=0} flag' $yaml_file)
