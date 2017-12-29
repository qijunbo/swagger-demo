SunwayCloud 测试环境搭建
==

- 创建Docker镜像

执行Rebuild, 就可以创建一个测试镜像, 来取代Lims的位置, 它当然不是Lims, 它非常小,可以方便的测试.

- 运行测试容器

执行restart,  然后在浏览器里面访问 http://<你的ip>:80  看到页面, 你就成功了.



Docker 容器发布
==

- 生成Docker镜像

```
 ./rebuild.sh
```

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


执行完毕后访问  http://localhost:32794 即可

- 使用 docker-compose 也是一种推荐的办法来启动容器.

```
 docker-compose up -d 
```

踩过的坑
==

- /bin/sh VS /bin/bash

[Dockerfile](Dockerfile) 继承自  openjdk:8-jre-alpine, 这个父镜像很小, 不错, 但是里面的shell只有sh, 没有bash, 所以[docker-entrypoint.sh](docker-entrypoint.sh) 第一行要用/bin/sh, 否则启动docker镜像的时候, 会报 ``` /bin/sh: docker-entrypoint.sh :not found  ``` 这个错误, 不是 docker-entrypoint.sh 找不到, 而是 /bin/bash 找不到.


参考文献
==

来自xwiki的[docker-entrypoint.sh](https://github.com/xwiki-contrib/docker-xwiki/blob/ebb7e79fa3f4da7d8a6cb7c8451a08fee2e1d2a3/9/mysql-tomcat/xwiki/docker-entrypoint.sh)

