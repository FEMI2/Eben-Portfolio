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
   return render(request, 'index.html')

class SendFormEmail(View):

    def post(self, request):
        # Get the form data from POST request
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        message = request.POST.get('message', '')

        # Validate required fields
        if not all([name, email, message]):
            messages.error(request, 'All fields are required.')
            return redirect('index')

        # Send email to admin with contact form details
        admin_email = getattr(settings, 'ADMIN_EMAIL', 'admin@example.com')
        
        email_subject = f'New Contact Form Message from {name}'
        email_body = f'''New contact form submission:

Name: {name}
Email: {email}
Message:
{message}

Reply to: {email}'''
        
        try:
            send_mail(
                email_subject,
                email_body,
                settings.DEFAULT_FROM_EMAIL,
                [admin_email],
                fail_silently=False,
            )
            messages.success(request, 'Thank you for your message! I will get back to you soon.')
        except Exception as e:
            messages.error(request, 'Sorry, there was an error sending your message. Please try again later.')
            print(f'Email sending error: {e}')

        return redirect('index')

    def get(self, request):
        # Redirect GET requests to the main page
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
