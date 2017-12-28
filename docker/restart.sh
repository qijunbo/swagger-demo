docker container stop swagger_demo
docker container rm swagger_demo
docker container run --name swagger_demo -d -p 80:80 qijunbo/swagger_demo
 
