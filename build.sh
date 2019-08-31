#!/bin/sh
chmod 770 gradlew
./gradlew clean build --daemon
#./mvnw clean package
workfolder=/opt/apps
mkdir -p ${workfolder}
app=swaggerDemo
version=1.0

mkdir -p ${workfolder}/${app}
sudo systemctl stop ${app}
cp -vpf build/libs/${app}.jar  ${workfolder}/${app}/${app}.jar
#cp -vpf target/${app}.jar  ${workfolder}/${app}/${app}.jar
chmod 755 ${workfolder}/${app}/${app}.jar
sudo ln -sf  ${workfolder}/${app}/${app}.jar  /etc/init.d/${app}
sudo systemctl daemon-reload
#sudo chkconfig ${app} on
sudo systemctl enable ${app}
sudo systemctl start ${app}
