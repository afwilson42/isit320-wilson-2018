#!/bin/bash

function banner {
    echo ' '
    echo ===============================
    echo --- "$1" ---
    echo ===============================
}

function show {
    banner "$1"
    sudo systemctl show -p ActiveState -p SubState -p Environment $2
}

function showSystemCheck() {
    show 'SystemCheck' systemcheck.service
}


function checkPorts() {
    sudo nmap -p 30025-30035 192.168.2.13
}

message 'System Service Control'
T
echo 'Learn about Systemd and other running services.'

while true; do
    message "Menu"    
    echo -e "$LIGHT_GREEN  a) Check Ports 30025-30040"
    echo -e "$LIGHT_GREEN  b) Only Build"
    echo -e "$LIGHT_GREEN  c) Only Delete"
    echo -e "$LIGHT_RED  x) Exit"
    echo -e "\n$NC"
    read -p "Please make a selection: " userInput
    case $userInput in
        [Aa]* ) checkPorts false; continue;;
        [Bb]* ) showSystemCheck; continue;;
        [Cc]* ) deleteOld; continue;;
        [XxQq]* ) break;;
        *) echo -e "\n$NC" + "Please answer with a, b, c, or x.";;
    esac
done
