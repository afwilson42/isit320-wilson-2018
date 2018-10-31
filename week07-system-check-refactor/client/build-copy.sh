#! /usr/bin/env bash

#declare variable with path to server public directory
SERVER_DIR='../server/public'

function copyNew(){
# run build converts to es5, puts code into 1 big sheet, and compresses
npm run build

# copy contents of build folder to Server public directory
cp -r build/* $SERVER_DIR/.
}

function deleteOld(){
# delete precache-manifest*.js file
rm $SERVER_DIR/precache-manifest*.js

# delete service-worker js file
rm $SERVER_DIR/service-worker.js

# delete static directory
rm -r $SERVER_DIR'/static'
}

copyNew
deleteOld




