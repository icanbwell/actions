# #!/bin/bash

# version=$PREFIX$(jq .version package.json | sed 's/"//g')
# echo "::set-output name=version::$version"

# yarn install --frozen-lockfile && yarn publish

echo "::set-output name=result::'IN THE SHELL SCRIPT'"
