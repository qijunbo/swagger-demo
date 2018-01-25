How to User this Docker image
==

- 生成Docker镜像

执行[rebuild.sh](rebuild.sh), 你就得到一个叫做 qijunbo/swagger_demo 的镜像.

```
 ./rebuild.sh
```

- 参数的含义

<table>
<tr><td>ACTIVE_PROFILE=dev </td><td>有两个取值, dev 是开发环境, 采用h2内存数据库, 不需要额外配置数据源. <br/> prod 表示生产环境, 需要额外指定数据库 </td> </tr>
<tr><td>APP_DB_HOST=db </td><td>数据库服务器的ip地址或者主机名</td> </tr>
<tr><td>APP_DB_PORT=3306 </td><td>数据库端口, 如果你用的是外部数据库服务器. 否则请忽略. </td> </tr>
<tr><td>APP_DB_USER=qijunbo </td><td>数据库用户名 </td> </tr>
<tr><td>APP_DB_PASSWORD=qijunbo </td><td>数据库密码 </td> </tr>
<tr><td>APP_DATABASE=swaggerdemo </td><td>数据库名称 </td> </tr>
</table>

- 使用h2内存数据库

默认的情形:
```
docker container run --name swagger_demo -d -p 32794:80 qijunbo/swagger_demo
```

参数指定:

```
docker container run --name swagger_demo  --env ACTIVE_PROFILE=dev -d -p 32794:80 qijunbo/swagger_demo
```

- 使用 mysql 数据库的情景:

先执行[startcreateDB.sh](startcreateDB.sh), 这里会创建mysql数据库,  端口是3306, 如果你已经有数据库占用3306了, 可以跳过这步, 否则会报错.

```
./startcreateDB.sh
```


执行完毕后访问  http://localhost:32794/ 即可 (注意最后面的这个斜杠/一定不能省略，这是一个相对路径的问题)

- 使用 docker-compose 也是一种推荐的办法来启动容器.

```
 docker-compose up -d 
```

- 集群模式运行 (运行这个命令之前要先初始化 docker swarm 模式)  可参考更详细的说明：[Docker Service](https://github.com/qijunbo/dockerstudy/tree/master/service)

```
docker stack deploy -c docker-compose.yml swagger_demo
```




踩过的坑
==

- /bin/sh VS /bin/bash

[Dockerfile](Dockerfile) 继承自  openjdk:8-jre-alpine, 这个父镜像很小, 不错, 但是里面的shell只有sh, 没有bash, 所以[docker-entrypoint.sh](docker-entrypoint.sh) 第一行要用/bin/sh, 否则启动docker镜像的时候, 会报 ``` /bin/sh: docker-entrypoint.sh :not found  ``` 这个错误, 不是 docker-entrypoint.sh 找不到, 而是 /bin/bash 找不到.

- mysql 容器内部的端口是3306

当你用 ``` --link ${name}:dbserver  ``` 链接某个mysql容器的时候, 这时候你就拥有了访问它内部ip和端口的权限, 那么它内部的端口肯定就是 ** 3306 ** 了,  下面这个参数当且仅当你使用一个非容器的mysql数据库且它的端口不是3306的时候才能排上用场,
```
 --env APP_DB_PORT=${port} \
```

参考文献
==

来自xwiki的[docker-entrypoint.sh](https://github.com/xwiki-contrib/docker-xwiki/blob/ebb7e79fa3f4da7d8a6cb7c8451a08fee2e1d2a3/9/mysql-tomcat/xwiki/docker-entrypoint.sh)

