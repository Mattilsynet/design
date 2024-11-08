#!/bin/bash

rm -fr resources
cd ../
npm install
npm run build
cd clojure
clojure -A:dev -T:build build-css-modules
clojure -A:dev -T:build export-all-svgs
