echo timestamp=%date:~0,10% %time:~0,8% >src\main\resources\version.properties
echo version=1.2 >>src\main\resources\version.properties
gradlew clean build
