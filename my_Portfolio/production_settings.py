import os
from .settings import *
from decouple import config
import dj_database_url

# Production settings
DEBUG = False

# Security settings
SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')

_hosts_env = [h.strip() for h in config('ALLOWED_HOSTS', default='').split(',') if h.strip()]
_default_hosts = {'ebenezerportfolio.com', 'www.ebenezerportfolio.com', '.onrender.com', 'localhost', '127.0.0.1'}
if not _hosts_env:
    ALLOWED_HOSTS = list(_default_hosts)
elif '*' in _hosts_env:
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = list(set(_hosts_env) | _default_hosts)

# CSRF trusted origins
_csrf_env = config('CSRF_TRUSTED_ORIGINS', default='')
if _csrf_env:
    CSRF_TRUSTED_ORIGINS = [o.strip() for o in _csrf_env.split(',') if o.strip()]
else:
    _hosts = [h for h in ALLOWED_HOSTS if h and h != '*']
    CSRF_TRUSTED_ORIGINS = [f'https://{h}' for h in _hosts] + [f'http://{h}' for h in _hosts]
    CSRF_TRUSTED_ORIGINS += ['https://*.onrender.com']

# Database configuration for production
# Use SQLite for local production testing, PostgreSQL for cloud deployment
if config('DATABASE_URL', default=None):
    # Use PostgreSQL if DATABASE_URL is provided (for cloud platforms like Heroku)
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(conn_max_age=500)
    }
else:
    # Use SQLite for local production testing
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'production_db.sqlite3'),
        }
    }

# Static files configuration for production
_PARENT_DIR = os.path.dirname(BASE_DIR)
STATIC_ROOT = os.path.join(_PARENT_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(_PARENT_DIR, 'static'),
    os.path.join(_PARENT_DIR, 'backend', 'static'),
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# WhiteNoise middleware for serving static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

# Security settings for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_SECONDS = 31536000
SECURE_REDIRECT_EXEMPT = []
SECURE_SSL_REDIRECT = False  # Disabled for local testing
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = False  # Disabled for local testing
CSRF_COOKIE_SECURE = False  # Disabled for local testing
X_FRAME_OPTIONS = 'DENY'

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/tmp/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Template configuration override
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'backend', 'Templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@ebenezerportfolio.com')
ADMIN_EMAIL = config('ADMIN_EMAIL', default='admin@ebenezerportfolio.com')
if not EMAIL_HOST_USER or not EMAIL_HOST_PASSWORD:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
