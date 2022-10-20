#!/bin/bash

version=2.0.0
# echo "::set-output name=version::$version"

# yarn install --frozen-lockfile && yarn publish

echo "::debug::version is $version"
echo "version=$version" >> $GITHUB_ENV
