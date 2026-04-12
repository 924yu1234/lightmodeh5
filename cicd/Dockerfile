FROM registry.degate.space/base/node:16-105

ENV APP_HOME=/usr/local/app
RUN mkdir -p $APP_HOME

COPY cicd/config_converter.* /usr/local/bin/
COPY cicd/render_config.* /usr/local/bin/
COPY cicd/config /etc/app/templates/
COPY cicd/entrypoint.sh /usr/local/bin/
# just for deprecated initContiner, nothing else
RUN mkdir -p /data && touch /data/module_config.tpl

#------from old Dockerfile------
RUN echo "Asia/Shanghai" > /etc/timezone
RUN rm -fr /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
RUN mkdir -p /andui
COPY . /andui/
WORKDIR /andui/
#------from old Dockerfile------

ENTRYPOINT ["entrypoint.sh"]
