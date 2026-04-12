#!/usr/bin/env bash

set -eux
cp /usr/local/bin/config_converter.* ./
cd ../
npm run clean:production
