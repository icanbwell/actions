#!/bin/bash

version=$PREFIX$(jq .version package.json | sed 's/"//g')
# echo "::set-output name=version::$version"

# yarn install --frozen-lockfile && yarn publish

echo "result=IN THE SHELL SCRIPT" >> $GITHUB_OUTPUT
echo "version=$version" >> $GITHUB_OUTPUT
