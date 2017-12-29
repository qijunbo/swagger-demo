#!/bin/sh
name=$1

if [ -z "${name}" ]; then 
   echo "Usage: $0 name"
   exit -1 ;
fi
docker stop ${name}
docker stop swagger_demo
docker container prune -f

set -e

mkdir -p  /opt/mysql/${name}/data
docker run --name ${name} \
    -v /opt/mysql/${name}/data:/var/lib/mysql  \
    -e MYSQL_ROOT_PASSWORD=qijunbo  \
	-e MYSQL_DATABASE=swaggerdemo \
    -d -P mysql \
    --character-set-server=utf8 --collation-server=utf8_general_ci 

docker container run --name swagger_demo \
                     --link ${name}:dbserver \
                     --env ACTIVE_PROFILE=prod \
                     --env APP_DB_HOST=dbserver \
                     --env APP_DB_USER=root \
                     --env APP_DB_PASSWORD=qijunbo \
                     --env APP_DATABASE=swaggerdemo \
                     -d -p 32794:80 qijunbo/swagger_demo
                     
docker ps -a   

 
