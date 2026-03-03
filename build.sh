#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Building Frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Building Backend..."
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate --noinput
