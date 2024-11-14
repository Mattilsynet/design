#!/bin/bash

set -xe

rm -fr resources

if test -d dist; then
    $(cd ../ && npm install && npm run build)
fi

clojure -A:dev -T:build build-css-modules
clojure -A:dev -T:build export-all-svgs
clojure -A:dev -T:build export-css
