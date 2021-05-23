#!/usr/bin/env bash

export FLASK_APP=api/saveddit.py
export FLASK_ENV=development
export SAVEDDIT_CLIENT_ID=$(head -n 1 config.txt)
export SAVEDDIT_CLIENT_SECRET=$(head -n 2 config.txt | tail -n 1)

source venv/bin/activate
flask run
