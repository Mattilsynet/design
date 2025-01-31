#!/bin/bash

set -xe

./build.sh

rm -f mattilsynet-design.jar
version=$(clojure -A:dev -T:build bump-version)

git add .
git commit -m "chore: release Clojure library $version"
git tag -a v$version -m "chore: tag Clojure library $version"

clojure -M:dev:jar 2> /dev/null
mvn deploy:deploy-file \
  -Dfile=mattilsynet-design.jar \
  -DrepositoryId=clojars \
  -Durl=https://clojars.org/repo \
  -DpomFile=pom.xml
