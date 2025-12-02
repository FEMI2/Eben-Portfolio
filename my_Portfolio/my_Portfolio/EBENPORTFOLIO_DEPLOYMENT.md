# 🚀 Deploy ebenezerportfolio.com - Complete Guide

This guide will help you deploy your Django portfolio to **ebenezerportfolio.com** and make it live!

## 🎯 Quick Start (Recommended: Heroku)

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login
```

### Step 2: Create Your Heroku App
```bash
cd '/Users/fm/Desktop/Personal Portfolio/my_Portfolio'
heroku create ebenportfolio
# This creates: https://ebenportfolio.herokuapp.com
```

### Step 3: Set Environment Variables
```bash
# Generate a strong secret key
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Set the environment variables (replace YOUR_SECRET_KEY with the generated key)
heroku config:set SECRET_KEY="YOUR_SECRET_KEY_HERE"
heroku config:set DEBUG=False
heroku config:set DJANGO_SETTINGS_MODULE=my_Portfolio.production_settings
```

### Step 4: Add PostgreSQL Database
```bash
heroku addons:create heroku-postgresql:mini
```

### Step 5: Deploy to Heroku
```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial deployment for ebenezerportfolio.com"

# Add Heroku remote and deploy
heroku git:remote -a ebenportfolio
git push heroku main
```

### Step 6: Run Database Setup
```bash
heroku run python manage.py migrate
heroku run python manage.py collectstatic --noinput

# Optional: Create admin user
heroku run python manage.py createsuperuser
```

### Step 7: Add Your Custom Domain
```bash
# Add your domains to Heroku
heroku domains:add ebenezerportfolio.com
heroku domains:add www.ebenezerportfolio.com

# Get the DNS target
heroku domains
# Note the DNS Target (something like: xxx-xxx-xxx.herokudns.com)
```

### Step 8: Configure DNS at Your Domain Registrar

Log into your domain registrar (where you bought ebenezerportfolio.com) and add these DNS records:

**DNS Records to Add:**
```
Type: CNAME
Name: www
Value: ebenportfolio.herokuapp.com
TTL: 300 (or Auto)

Type: ALIAS or ANAME (if supported) or A record
Name: @ (root domain)
Value: ebenportfolio.herokuapp.com
TTL: 300 (or Auto)
```

**If ALIAS/ANAME not supported, use A records:**
```
Type: A
Name: @
Value: [Get IP from: dig ebenportfolio.herokuapp.com]

Type: A
Name: www
Value: [Same IP as above]
```

### Step 9: Enable SSL Certificate
```bash
# Enable automatic SSL
heroku certs:auto:enable
```

### Step 10: Test Your Website

Wait 5-30 minutes for DNS propagation, then visit:
- https://ebenezerportfolio.com
- https://www.ebenezerportfolio.com

## 🔧 Alternative: DigitalOcean App Platform

### Quick Setup:
1. **Create DigitalOcean Account** → digitalocean.com
2. **Create New App** → Connect GitHub repository
3. **Configure Build Settings:**
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - Run Command: `gunicorn my_Portfolio.wsgi`
4. **Add Environment Variables:**
   ```
   SECRET_KEY=your-secret-key
   DEBUG=False
   DJANGO_SETTINGS_MODULE=my_Portfolio.production_settings
   ```
5. **Add PostgreSQL Database** (in Components section)
6. **Add Custom Domain:** ebenezerportfolio.com
7. **Configure DNS** as provided by DigitalOcean

## 🌐 DNS Configuration Examples

### Common Domain Registrars:

**Namecheap:**
- Host: `@`, Type: `ALIAS`, Value: `ebenportfolio.herokuapp.com`
- Host: `www`, Type: `CNAME`, Value: `ebenportfolio.herokuapp.com`

**GoDaddy:**
- Type: `CNAME`, Name: `www`, Value: `ebenportfolio.herokuapp.com`
- Type: `A`, Name: `@`, Value: `[Heroku IP]`

**Cloudflare:**
- Type: `CNAME`, Name: `www`, Content: `ebenportfolio.herokuapp.com`
- Type: `CNAME`, Name: `@`, Content: `ebenportfolio.herokuapp.com`

## ✅ Post-Deployment Checklist

- [ ] Website loads at https://ebenezerportfolio.com
- [ ] SSL certificate is active (green lock icon)
- [ ] All pages work correctly
- [ ] Static files (CSS, JS, images) load properly
- [ ] Contact forms work (if applicable)
- [ ] Mobile responsiveness maintained
- [ ] Admin panel accessible at /admin/

## 🚨 Troubleshooting

### Website Not Loading:
```bash
# Check Heroku logs
heroku logs --tail

# Check DNS propagation
nslookup ebenezerportfolio.com
```

### Static Files Not Loading:
```bash
# Recollect static files
heroku run python manage.py collectstatic --noinput
```

### Database Issues:
```bash
# Check database connection
heroku run python manage.py dbshell

# Re-run migrations
heroku run python manage.py migrate
```

### SSL Certificate Issues:
```bash
# Check certificate status
heroku certs

# Force SSL renewal
heroku certs:auto:refresh
```

## 🔄 Future Updates

To update your live website:
```bash
# Make your changes locally
git add .
git commit -m "Update description"
git push heroku main

# If database changes:
heroku run python manage.py migrate
```

## 📞 Support

**If you encounter issues:**
1. Check Heroku logs: `heroku logs --tail`
2. Verify DNS settings at your registrar
3. Ensure all environment variables are set
4. Test locally with production settings first

## 🎉 Success!

Once completed, your portfolio will be live at:
- **https://ebenezerportfolio.com** ✨
- **https://www.ebenezerportfolio.com** ✨

With automatic SSL, fast loading, and professional hosting!

---

**Estimated Time:** 30-60 minutes (including DNS propagation)
**Cost:** Free tier available on both Heroku and DigitalOcean