cp ../build/libs/swaggerDemo-0.1.0.jar ./
docker image rm qijunbo/swagger_demo	
docker image build -t qijunbo/swagger_demo  . 
