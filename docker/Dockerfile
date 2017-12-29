# You should have received a copy of the GNU Lesser General Public
# License along with this software; if not, write to qijunbo <junboqi@foxmail.com>

FROM openjdk:8-jre-alpine
MAINTAINER qijunbo <junboqi@foxmail.com>

# ACTIVE_PROFILE used to switch the active profile in application.yml
ENV ACTIVE_PROFILE=dev APP_DB_HOST=db APP_DB_PORT=3306 APP_DB_USER=qijunbo APP_DB_PASSWORD=qijunbo APP_DATABASE=swaggerdemo

RUN  mkdir -p /root/webapp/config
COPY swaggerDemo-0.1.0.jar /root/webapp/demo.jar
COPY *.yml /root/webapp/config/
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod 777 /usr/local/bin/*.sh
WORKDIR /root/webapp
EXPOSE 80
ENTRYPOINT docker-entrypoint.sh