#!/usr/bin/env bash

set -eux

# Check if render_config.py exists and is executable
RENDER_CONFIG_PYTHON_PATH=/usr/local/bin/render_config.py
if [[ -f $RENDER_CONFIG_PYTHON_PATH ]]; then
  echo "start to render config from consul by Python"
  python3 $RENDER_CONFIG_PYTHON_PATH
else
  echo "start to render config by j2 CLI"
  render_config.sh
fi

# new rendered config 
cp /etc/app/application.toml  /andui/.env
# cp /tmp/module.config  /andui/.env

#------keep unchange------
node docker/fixEnv.js
if [ $? != 0 ]; then
  exit 1
fi
echo "rm -fr /usr/share/nginx/html/*"
rm -fr /usr/share/nginx/html/*
echo "mv /andui/docker/default.conf /etc/nginx/sites-enabled/default"
mv /andui/docker/default.conf /etc/nginx/sites-enabled/default
echo "mv /andui/build/* /usr/share/nginx/html/"
mv /andui/build/* /usr/share/nginx/html/
echo "mkdir -p /var/www/html/degate-web/"
mkdir -p /var/www/html/degate-web/
echo "cp files to /var/www/html/degate-web/"
cp -r /usr/share/nginx/html/* /var/www/html/degate-web/

echo "start nginx"
/usr/sbin/nginx -g 'daemon off; master_process on;'
#------keep unchange------
