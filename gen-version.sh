#!/bin/bash
GIT_TAG=$(git describe --tags --abbrev=0)
echo "const version = '$GIT_TAG'" > version.js


