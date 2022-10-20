#!/bin/bash

version=1.0.0
echo "::set-output name=version::$version"

# yarn install --frozen-lockfile && yarn publish

echo "::debug::version is $version"
echo "result=IN THE SHELL SCRIPT" >> $GITHUB_OUTPUT
# echo "version=$version" >> $GITHUB_OUTPUT
