from django.utils.cache import patch_cache_control
from django.http import HttpResponse
from django.conf import settings
import time

class StaticFilesCacheMiddleware:
    """
    Middleware to add cache headers to static files
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Add cache headers for static files
        if request.path.startswith('/static/'):
            # Cache static files for 1 year
            max_age = getattr(settings, 'STATIC_FILE_MAX_AGE', 31536000)
            response['Cache-Control'] = f'public, max-age={max_age}, immutable'
            response['Expires'] = time.strftime('%a, %d %b %Y %H:%M:%S GMT', 
                                              time.gmtime(time.time() + max_age))
            # Add ETag for better caching
            if 'Last-Modified' in response:
                response['ETag'] = f'"static-{hash(response["Last-Modified"])}"'
            
            # Force cache headers even if they exist
            response['X-Static-Cache'] = 'enabled'
            
        return response