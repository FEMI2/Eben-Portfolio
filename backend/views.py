from django.shortcuts import render, get_object_or_404
from django.core.mail import EmailMessage
from django.shortcuts import redirect
from django.template.loader import get_template
from django.template import loader
from django.http import HttpResponse, Http404
from django.views.generic import View
from django.contrib import messages
from django.core.mail import send_mail
from django.views import generic
from django.conf import settings
from django.views.generic import FormView, TemplateView
from django.urls import reverse_lazy
from django.utils.http import http_date
import os
import time
import mimetypes

# Create your views here.
def index(request):
   return render(request, 'backend/index.html')

class SendFormEmail(View):

    def  get(self, request):

        # Get the form data 
        name = request.GET.get('name', None)
        email = request.GET.get('email', None)
        message = request.GET.get('message', None)

        send_mail(
            'Subject - New Contact Me Message From Your Website', 
            'Hello ' + name + ',\n' + message, 
            'Ebenezer@europe.com', # Admin
            [
                email,
            ]
        )

        # Redirect to same page after form submit
        messages.success(request, ('Email sent successfully.'))
        return redirect('index')


def cached_static_serve(request, path, document_root=None, show_indexes=False):
    """
    Serve static files with proper cache headers
    """
    print(f"DEBUG: cached_static_serve called for path: {path}")
    if document_root is None:
        if settings.DEBUG:
            document_root = settings.STATICFILES_DIRS[0] if settings.STATICFILES_DIRS else settings.STATIC_ROOT
        else:
            document_root = settings.STATIC_ROOT
    print(f"DEBUG: Using document_root: {document_root}")
    
    # Get the file
    fullpath = os.path.join(document_root, path)
    
    if not os.path.exists(fullpath):
        raise Http404('Static file not found')
    
    # Get file stats
    statobj = os.stat(fullpath)
    
    # Determine content type
    content_type, encoding = mimetypes.guess_type(fullpath)
    content_type = content_type or 'application/octet-stream'
    
    # Read file content
    with open(fullpath, 'rb') as f:
        content = f.read()
    
    # Create response
    response = HttpResponse(content, content_type=content_type)
    
    # Add cache headers
    max_age = getattr(settings, 'STATIC_FILE_MAX_AGE', 31536000)  # 1 year
    response['Cache-Control'] = f'public, max-age={max_age}, immutable'
    response['Expires'] = http_date(time.time() + max_age)
    response['Last-Modified'] = http_date(statobj.st_mtime)
    response['ETag'] = f'"static-{statobj.st_mtime}-{statobj.st_size}"'
    
    # Add content disposition for certain file types
    if path.endswith(('.css', '.js')):
        response['Content-Disposition'] = f'inline; filename="{os.path.basename(path)}"'
    
    return response
