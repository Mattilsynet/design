#!/bin/bash

set -xe

rm -fr resources

clojure -A:dev -T:build build-css-modules
clojure -A:dev -T:build export-all-svgs
clojure -A:dev -T:build export-css
clojure -A:dev -T:build export-assets
