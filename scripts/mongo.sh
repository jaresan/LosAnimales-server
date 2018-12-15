#!/bin/sh
source $(dirname "$0")/../.env
mongo $MONGODB_URI
