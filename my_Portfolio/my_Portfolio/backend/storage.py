from django.contrib.staticfiles.storage import StaticFilesStorage
from django.core.files.storage import get_storage_class
from django.conf import settings
from django.utils.functional import LazyObject

class CachedStaticFilesStorage(StaticFilesStorage):
    """
    Custom static files storage that adds cache headers
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.max_age = getattr(settings, 'STATIC_FILE_MAX_AGE', 31536000)
    
    def url(self, name):
        """
        Return the URL for the file, with cache-busting if needed
        """
        url = super().url(name)
        return url
    
    def get_cache_control_header(self):
        """
        Return the cache control header for static files
        """
        return f'public, max-age={self.max_age}, immutable'