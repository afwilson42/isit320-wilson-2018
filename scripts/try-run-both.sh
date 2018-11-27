#! /usr/bin/env bash

if [[ -z $1 ]]; then
    echo -e "======================================================"
    echo -e "Pass in build or run."
    echo -e "build means that npm install will be added to the mix."
    echo -e "  try-run-both build" <=== performs a build and then runs the app
    echo -e "  try-run-both run"   <=== there is no build, only run (npm start)
    echo -e "======================================================"
    exit
fi

if [[ $1 = "build" ]]; then
    cd client && npm i && cd ../server && npm i && bower install && cd .. && npm i
fi

cd server
nohup node bin/www &
cd ../client
nohup ./node_modules/react-scripts/bin/react-scripts.js start &
