#!/bin/bash

set -xe

./build.sh

rm -f mattilsynet-design.jar
version=$(clojure -A:dev -T:build bump-version)
echo $version

clojure -M:dev:jar 2> /dev/null
mv mattilsynet-design.jar design-$version.jar

mvn deploy:deploy-file \
  -Dfile=design-$version.jar \
  -DrepositoryId=clojars \
  -Durl=https://clojars.org/repo \
  -DpomFile=pom.xml
