#!/bin/sh -e

# install dependancies
/usr/local/bin/npm install

# compile files with webpack, and recompile each time they are changed
/usr/local/bin/npm run dev