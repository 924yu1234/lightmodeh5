#!/usr/bin/env bash

set -eux

# 服务初始化脚本，仅首次部署时执行。当 config.json 配置为 `"isInit": true` 时，会触发执行