#! /usr/bin/env bash

# If 2nd parameter is not detected, stop and display message
if [[ -z $2 ]]; then
    echo -e "You must pass in a commit message and the project name"
    exit
fi

# If a 3rd parameter is detected, stop and display message
if [[ ! -z $3 ]]; then
    echo -e "Too many parameters"
    exit
fi

# IFS is the default separator of white space
# BASH_REMATCH gets the first Regular Express match
function git_branch {
  local git_status="$(git status 2> /dev/null)"  
  local on_branch="On branch ([^${IFS}]*)"  
  local on_commit="HEAD detached at ([^${IFS}]*)"

  if [[ $git_status =~ $on_branch ]]; then
    local branch=${BASH_REMATCH[1]}
    echo "$branch"
  elif [[ $git_status =~ $on_commit ]]; then
    local commit=${BASH_REMATCH[1]}
    echo "$commit"
  fi
}

# retrieve current Git Tag version
OLD_TAG_VERSION=`git tag --sort=taggerdate | tail -1 |  sed -En "s/v(.*)/\1/p"`

# increment tag by 1 digit
TAG_VERSION=v`semver-inc -p $OLD_TAG_VERSION`

# get the current branch
BRANCH=`git_branch`

# create the tag string from current branch
TAG_STRING="$1 for $2 on branch `git_branch` with tag ${TAG_VERSION}."

function push_tag() {
  # check git status, add all, commit, and push
  git status
  git add .
  git commit -m "${TAG_STRING} $NOW"
  git push --set-upstream origin ${BRANCH}
  
  # set new tag and push it to git
  git tag -a "${TAG_VERSION}" -m "${TAG_STRING}"
  git push origin "${TAG_VERSION}"
}

# run push_tag function
push_tag
