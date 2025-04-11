#!/bin/bash

set -xe

./build.sh

rm -f mattilsynet-design.jar
clojure -A:dev -T:build bump-version

clojure -M:dev:jar 2> /dev/null
mvn deploy:deploy-file \
  -Dfile=mattilsynet-design.jar \
  -DrepositoryId=clojars \
  -Durl=https://clojars.org/repo \
  -DpomFile=pom.xml
