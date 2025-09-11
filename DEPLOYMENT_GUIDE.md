# Django Portfolio Deployment Guide

This guide will help you deploy your Django portfolio website to make it live with your custom domain.

## Prerequisites

- Your Django project (ready)
- A domain name
- Git repository (GitHub recommended)
- Basic command line knowledge

## Deployment Options

### Option 1: Heroku (Easiest - Recommended for beginners)

#### Step 1: Prepare Your Project

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd /path/to/your/project
   heroku create your-portfolio-name
   ```

#### Step 2: Configure Environment Variables

```bash
# Set environment variables
heroku config:set SECRET_KEY="your-super-secret-key-here"
heroku config:set DEBUG=False
heroku config:set DJANGO_SETTINGS_MODULE=my_Portfolio.production_settings
```

#### Step 3: Add PostgreSQL Database

```bash
heroku addons:create heroku-postgresql:mini
```

#### Step 4: Deploy

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial deployment"

# Add Heroku remote
heroku git:remote -a your-portfolio-name

# Deploy
git push heroku main
```

#### Step 5: Run Migrations

```bash
heroku run python manage.py migrate
heroku run python manage.py collectstatic --noinput
```

#### Step 6: Configure Custom Domain

1. **Add domain to Heroku**
   ```bash
   heroku domains:add yourdomain.com
   heroku domains:add www.yourdomain.com
   ```

2. **Get DNS target**
   ```bash
   heroku domains
   ```

3. **Configure DNS at your domain registrar**
   - Add CNAME record: `www` → `your-app-name.herokuapp.com`
   - Add ALIAS/ANAME record: `@` → `your-app-name.herokuapp.com`

4. **Enable SSL**
   ```bash
   heroku certs:auto:enable
   ```

### Option 2: DigitalOcean App Platform

#### Step 1: Create DigitalOcean Account
- Sign up at digitalocean.com
- Create a new App

#### Step 2: Connect GitHub Repository
- Connect your GitHub repository
- Select the branch to deploy

#### Step 3: Configure Build Settings
- **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
- **Run Command**: `gunicorn my_Portfolio.wsgi`
- **Environment Variables**: Add all variables from .env.example

#### Step 4: Add Database
- Add PostgreSQL database component
- Note the connection details

#### Step 5: Configure Domain
- Add your custom domain in the settings
- Update DNS records as instructed

### Option 3: VPS (Advanced Users)

#### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install python3 python3-pip python3-venv nginx postgresql postgresql-contrib
```

#### Step 2: Database Setup

```bash
# Create database and user
sudo -u postgres psql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

#### Step 3: Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your actual values

# Run migrations
python manage.py migrate
python manage.py collectstatic --noinput
```

#### Step 4: Configure Gunicorn

```bash
# Create gunicorn service
sudo nano /etc/systemd/system/portfolio.service
```

Add this content:
```ini
[Unit]
Description=Portfolio Django App
After=network.target

[Service]
User=your-username
Group=www-data
WorkingDirectory=/path/to/your/project
Environment="PATH=/path/to/your/project/venv/bin"
ExecStart=/path/to/your/project/venv/bin/gunicorn --workers 3 --bind unix:/path/to/your/project/portfolio.sock my_Portfolio.wsgi:application

[Install]
WantedBy=multi-user.target
```

#### Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add this content:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /path/to/your/project;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/path/to/your/project/portfolio.sock;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## DNS Configuration

For any hosting option, configure these DNS records at your domain registrar:

### For Heroku/DigitalOcean:
- **Type**: CNAME, **Name**: www, **Value**: your-app-url
- **Type**: ALIAS/ANAME, **Name**: @, **Value**: your-app-url

### For VPS:
- **Type**: A, **Name**: @, **Value**: your-server-ip
- **Type**: A, **Name**: www, **Value**: your-server-ip

## Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] SSL certificate is active (https://)
- [ ] Static files are serving correctly
- [ ] Database is connected and working
- [ ] All pages and features work as expected
- [ ] Contact forms work (if applicable)
- [ ] Mobile responsiveness is maintained

## Troubleshooting

### Common Issues:

1. **Static files not loading**
   - Run `python manage.py collectstatic --noinput`
   - Check STATIC_ROOT and STATIC_URL settings

2. **Database connection errors**
   - Verify DATABASE_URL or database credentials
   - Ensure database is created and accessible

3. **Domain not working**
   - Check DNS propagation (can take up to 48 hours)
   - Verify DNS records are correct
   - Ensure domain is added to ALLOWED_HOSTS

4. **SSL issues**
   - Wait for certificate provisioning (can take a few minutes)
   - Check if HTTPS redirect is properly configured

## Maintenance

### Regular Updates:
```bash
# For Heroku
git add .
git commit -m "Update description"
git push heroku main

# For VPS
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart portfolio
```

## Support

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables are set
3. Ensure your domain DNS is properly configured
4. Test locally first with production settings

---

**Recommendation**: Start with Heroku for the easiest deployment experience. You can always migrate to other platforms later as your needs grow.