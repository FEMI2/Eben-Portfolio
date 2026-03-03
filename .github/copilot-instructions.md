# Copilot / AI agent instructions for Personal Portfolio

Summary
- Purpose: Small Django portfolio site with a single app (`backend`) and a duplicated project layout under `my_Portfolio/`. Agents should focus edits in `my_Portfolio/` for production changes and root-level files for static assets and deployment scripts.

Key places to look
- Django project: my_Portfolio/ (settings.py, production_settings.py, wsgi.py, manage.py)
- App code: backend/ (views.py, middleware.py, models.py, storage.py)
- Static assets: top-level `static/` and `staticfiles/` (these are copied/duplicated in multiple places)
- Deployment: Procfile, passenger_wsgi.py, deploy.sh, render.yaml
- Email and settings: settings.py uses `DEFAULT_FROM_EMAIL` and `ADMIN_EMAIL` referenced by `backend/views.py`

High-level architecture notes
- Single Django project with one primary app `backend`. The repository contains multiple nested copies (root vs `my_Portfolio/`) — the `my_Portfolio/` tree is the authoritative project for production.
- Static files are served from the `static/` folders. A custom view `cached_static_serve` (backend/views.py) implements long-lived caching (Cache-Control, Expires, ETag). Changes to static handling should consider `STATIC_FILE_MAX_AGE` in settings.
- Contact form: `SendFormEmail` (backend/views.py) reads POST `name`, `email`, `message` and uses `send_mail()`; ensure `DEFAULT_FROM_EMAIL` and `ADMIN_EMAIL` exist in settings before modifying behavior.

Developer workflows and useful commands
- Run locally: `python3 manage.py runserver --settings=my_Portfolio.settings` (or run `manage.py` inside `my_Portfolio/`).
- Migrations: `python3 manage.py makemigrations` and `python3 manage.py migrate` (use a local DB during dev; do NOT overwrite `production_db.sqlite3`).
- Tests: `python3 manage.py test` (app tests are in `backend/tests.py`).
- Static collection (if testing production-like setup): `python3 manage.py collectstatic --noinput` and verify `STATIC_ROOT` in `my_Portfolio/production_settings.py`.

Conventions and patterns specific to this repo
- Multiple copies of the project: edits that affect runtime should be made in `my_Portfolio/` first. The root-level files are often deployment artifacts — confirm which copy is used by the target environment.
- Static caching: when modifying JS/CSS, update cache-control behavior only in `backend/views.py` or via `STATIC_FILE_MAX_AGE` setting.
- Email sending: `backend/SendFormEmail` relies on Django's `send_mail()` and uses `messages` for user feedback; prefer raising logged exceptions only for non-production debug output.

Integration points and external dependencies
- Uses Django and standard Django email backends (see `requirements.txt`). Ensure SMTP or an email backend is configured in `production_settings.py` for deployment.
- Deployment targets: Passenger (passenger_wsgi.py / Procfile) and render (render.yaml). Review these files when changing startup behavior.
- SQLite databases: `db.sqlite3` and `production_db.sqlite3` exist — avoid committing sensitive production DBs; prefer using migrations and fresh DBs for CI.

Quick examples for agents (do this before changing behavior)
- Verify where you are editing: `ls my_Portfolio/` and run `python3 my_Portfolio/manage.py check` to confirm correct settings.
- To inspect static caching logic: open `backend/views.py` and look for `cached_static_serve` — it sets `Cache-Control`, `Expires`, `Last-Modified`, and `ETag`.
- To confirm email variables exist: check `my_Portfolio/production_settings.py` for `DEFAULT_FROM_EMAIL` and `ADMIN_EMAIL` before adjusting `SendFormEmail`.

What not to change without confirmation
- Do not directly modify `production_db.sqlite3` or files under `my_Portfolio/production_db.sqlite3` without explicit instruction.
- Avoid large-scale refactors across the duplicated project trees without coordinating which tree is authoritative for the target environment.

If uncertain, ask the maintainer
- Ask which folder (`root` vs `my_Portfolio/`) is the active runtime for a given environment and whether a change should be mirrored to other copies.

Files referenced frequently
- backend/views.py — contact form and static caching
- backend/middleware.py — middleware customizations (current editing context)
- my_Portfolio/settings.py and my_Portfolio/production_settings.py — runtime configuration
- Procfile, passenger_wsgi.py, render.yaml, deploy.sh — deployment startup

End of file
