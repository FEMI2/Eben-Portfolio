#!/usr/bin/env bash
# exit on error
set -o errexit

# Frontend build is now committed to the repo to avoid Node.js dependency on Render Python environment.
# If you need to rebuild frontend on Render, ensure Node.js is installed.
# echo "Building Frontend..."
# cd frontend
# npm install
# npm run build
# cd ..

echo "Building Backend..."
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput
