#!/usr/bin/env bash

export FLASK_APP=api/saveddit.py
export FLASK_ENV=development
export SAVEDDIT_CLIENT_ID=$(head -n 1 config.txt)
export SAVEDDIT_CLIENT_SECRET=$(head -n 2 config.txt | tail -n 1)
export APP_FRONTEND_URL=http://localhost:3000
export APP_BACKEND_URL=http://localhost:5000
export CORS_URL=http://localhost:3000


    /bin/bash -ec 'source venv/bin/activate && flask run &'
    /bin/bash -ec 'cd saveddit && yarn start'