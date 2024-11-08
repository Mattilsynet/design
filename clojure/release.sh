#!/bin/bash

set -e

./build.sh

rm -f mattilsynet-designsystem.jar
version=$(clojure -A:dev -T:build bump-version)

git add .
git commit -m "chore: release Clojure library $version"
git tag -s v$version -m "chore: tag Clojure library $version"
git push
git push --tags

clojure -A:dev -M:jar
mvn deploy:deploy-file -Dfile=mattilsynet-designsystem.jar -DrepositoryId=clojars -Durl=https://clojars.org/repo -DpomFile=pom.xml
