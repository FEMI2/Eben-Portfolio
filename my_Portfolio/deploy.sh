#!/bin/bash

# Django Portfolio Deployment Script
# Make this file executable: chmod +x deploy.sh

echo "🚀 Starting Django Portfolio Deployment..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo "✏️  Please edit .env file with your actual values before continuing."
    exit 1
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser (optional)
read -p "🔐 Do you want to create a superuser? (y/n): " create_superuser
if [ "$create_superuser" = "y" ]; then
    python manage.py createsuperuser
fi

echo "✅ Deployment preparation complete!"
echo "🌐 Your portfolio is ready for production deployment."
echo ""
echo "Next steps:"
echo "1. Choose a hosting platform (Heroku recommended for beginners)"
echo "2. Follow the DEPLOYMENT_GUIDE.md for detailed instructions"
echo "3. Configure your domain DNS settings"
echo "4. Set up SSL certificate"
echo ""
echo "📖 Read DEPLOYMENT_GUIDE.md for complete instructions."