#! /usr/bin/env bash

# declare variable for path
SERVER_DIR="${PWD}/../server/public"

# function to make copy of client and copy it to Server
function copyNew() {
	npm run build
	cp -r build/* ${SERVER_DIR}/.
}	

# function to delete unneeded files
function deleteOld() {
	rm -v ${SERVER_DIR}/index.html
	rm -v ${SERVER_DIR}/asset-manifest.json
	rm -v ${SERVER_DIR}/manifest.json
	rm -v ${SERVER_DIR}/precache-manifest*.js
	rm -v ${SERVER_DIR}/service-worker.js
	rm -v -r ${SERVER_DIR}'/static'
}

# function to run both copy and delete functions.
function runAll() {
	deleteOld
	copyNew
}

# take in parameter from starting command and choose which function/s to run.
while [ "$1" != "" ]; do
    case $1 in
        [Aa]* ) runAll; shift;;
        [Bb]* ) copyNew; shift;; 
        [Cc]* ) deleteOld; shift;;
        [XxQq]* ) break;;
        *) echo -e "\n$NC" + "Please answer with a, b, c, or x.";;
    esac
done
