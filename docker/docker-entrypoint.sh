#!/bin/sh

set -e

# Allows to use sed but with user input which can contain special sed characters such as \, / or &.
# $1 - the text to search for
# $2 - the replacement text
# $3 - the file in which to do the search/replace

function safesed {
  sed -i "s/$(echo $1 | sed -e 's/\([[\/.*]\|\]\)/\\&/g')/$(echo $2 | sed -e 's/[\/&]/\\&/g')/g" $3
}

safesed ACTIVE_PROFILE ${ACTIVE_PROFILE:-dev} /root/webapp/config/application.yml
safesed APP_DB_HOST ${APP_DB_HOST:-db} /root/webapp/config/application-prod.yml
safesed APP_DB_PORT ${APP_DB_PORT:-3306} /root/webapp/config/application-prod.yml
safesed APP_DB_USER ${APP_DB_USER:-qijunbo} /root/webapp/config/application-prod.yml
safesed APP_DB_PASSWORD ${APP_DB_PASSWORD:-qijunbo} /root/webapp/config/application-prod.yml
safesed APP_DATABASE ${APP_DATABASE:-swaggerdemo} /root/webapp/config/application-prod.yml


java -jar demo.jar
