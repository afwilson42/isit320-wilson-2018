#! /usr/bin/env bash

RED='\033[0;31m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;36m'
NC='\033[0m' # No Color

SERVER_DIR="${PWD}/../server/public"

function message {
    echo -e $BLUE
    echo =============================
    echo "$1"
    echo =============================
    echo
}

message "Build Copy Client to Server"

# delete old unwanted files
function deleteOld() {
    rm -v ${SERVER_DIR}/precache-manifest*.js
    rm -v -r ${SERVER_DIR}'/static'

# add code to remove these files as well....
# asset-manifest.json
    rm -v ${SERVER_DIR}/asset-manifest.json
    
# favicon.ico
    rm -v ${SERVER_DIR}/favicon.ico
    
# index.html
    rm -v ${SERVER_DIR}/index.html
    
# manifest.json
    rm -v ${SERVER_DIR}/manifest.json
    
# precache-manifest.2efd1de520c30948b299e17d59c75fef.js
    rm -v ${SERVER_DIR}/precache-manifest*.js
    
# service-worker.js
    rm -v ${SERVER_DIR}/service-worker.js
    
# static
    rm -v ${SERVER_DIR}/static
}

# make new build
function copyNew() {
    npm run build
    cp -r build/* ${SERVER_DIR}/.
}

#  delete old files and make new copy
function runAll() {
	deleteOld
	copyNew
}

# menu to select option of which function/s to run.
while true; do
    message "Menu"    
    echo -e "$LIGHT_GREEN  a) Delete Old Files and Run Build"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_RED  x) Exit (You should source .bashrc when done)"
    echo -e "\n$NC"
    read -p "Please make a selection: " userInput
    case $userInput in
        [Aa]* ) runAll ; continue;;
        [Bb]* ) copyNew; continue;;
        [Cc]* ) deleteOld; continue;;
        [XxQq]* ) break;;
        *) echo -e "\n$NC" + "Please answer with a, b, c or x (or q).";;
    esac
done
