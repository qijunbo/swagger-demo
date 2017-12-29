#!/bin/sh

set -e

name=$1

if [ -z "${name}" ]; then 
   echo "Usage: $0 name"
   exit -1 ;
fi

mkdir -p  /opt/mysql/${name}/data

docker stop ${name}
docker container prune -f 
docker run --name ${name} \
    -v /opt/mysql/${name}/data:/var/lib/mysql  \
    -e MYSQL_ROOT_PASSWORD=qijunbo  \
	-e MYSQL_DATABASE=swaggerdemo \
    -d -p 3306:3306 mysql \
    --character-set-server=utf8 --collation-server=utf8_general_ci 

port=`docker inspect --format='{{(index (index .NetworkSettings.Ports "3306/tcp") 0).HostPort}}' ${name}`

docker container run --name swagger_demo \
                     --link ${name}:dbserver \
                     --env ACTIVE_PROFILE=prod \
                     --env APP_DB_HOST=dbserver:${port} \
                     --env APP_DB_USER=root \
                     --env APP_DB_PASSWORD=qijunbo \
                     --env APP_DATABASE=swaggerdemo \
                     -d -p 32794:80 qijunbo/swagger_demo
                     
docker ps -a   

 
