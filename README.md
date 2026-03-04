# Ebenezer Iluyomade - Personal Portfolio

A modern, responsive personal portfolio website built with a **React** frontend and a **Django** backend.

## 🚀 Live Site
[ebenezerportfolio.com](https://ebenezerportfolio.com)

## 🛠️ Technology Stack

### Frontend
- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS** (v4)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

### Backend
- **Django 5.2.6**
- **WhiteNoise** (Static file serving)
- **Gunicorn** (WSGI Server)

### Deployment
- **Platform:** Render
- **Build Strategy:** Pre-built frontend assets committed to repository to simplify Render Python environment build.

## 📂 Project Structure

```
├── frontend/               # React Source Code
│   ├── src/                # Components, Styles, Assets
│   └── vite.config.ts      # Vite Configuration (Outputs to ../static/dist)
│
├── my_Portfolio/           # Django Project Configuration
│   ├── settings.py         # Development Settings
│   ├── production_settings.py # Production Settings (Render)
│   └── urls.py             # URL Routing (API + Frontend serving)
│
├── backend/                # Django App
│   └── views.py            # Views for serving index.html and API endpoints
│
├── static/                 # Static Files
│   └── dist/               # Compiled React App (Committed to Git)
│
├── manage.py               # Django Management Script
└── render.yaml             # Render Blueprint Configuration
```

## 💻 Local Development

### Prerequisites
- Node.js & npm
- Python 3.12+

### 1. Frontend Development
To work on the React frontend:

```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000`.

### 2. Backend Integration
To run the full stack (Django serving React):

1.  **Build Frontend:**
    ```bash
    cd frontend
    npm run build
    ```
    *This generates files in `static/dist/`.*

2.  **Setup Django:**
    ```bash
    # Create virtual environment
    python -m venv .venv
    source .venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt

    # Collect static files
    python manage.py collectstatic
    ```

3.  **Run Server:**
    ```bash
    python manage.py runserver
    ```
    Runs on `http://127.0.0.1:8000` (or `3001` if specified).

## 🚀 Deployment Workflow

This project is deployed on **Render** using a simplified workflow where frontend assets are pre-built and committed.

1.  **Make Changes:** Edit `frontend/src/...` or Django files.
2.  **Build Frontend:**
    ```bash
    cd frontend
    npm run build
    ```
3.  **Commit & Push:**
    ```bash
    git add frontend/src static/dist
    git commit -m "Update features"
    git push
    ```
4.  **Render Auto-Deploy:**
    - Render detects the push.
    - Executes Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`.
    - Starts Server: `gunicorn my_Portfolio.wsgi:application`.

## 📝 Features
- **Hero Section:** Interactive 3D-style layout.
- **Experience:** Timeline of professional history.
- **Contact Form:** Functional form integrated with Django backend.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

## 📧 Contact
**Ebenezer Iluyomade** - Cloud Systems & Security Engineer
