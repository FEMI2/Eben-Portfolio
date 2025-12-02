import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'my_Portfolio.production_settings')

from my_Portfolio.wsgi import application
