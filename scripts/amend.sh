#!/bin/sh
git commit --amend --no-edit && git push -f && git push heroku master -f
