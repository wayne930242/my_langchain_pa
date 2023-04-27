```shell
# Create a .env.local file
cp .env.local.example .env.local
```

## 1. Setup the backend **Dj-api**

```shell
cd dj-api

# Download necessary packages
poetry install

# Make database migrations
poetry run ./manage.py makemigrations
poetry run ./manage.py migrate 

# Create admin superuser
poetry run ./manage.py createsuperuser
# > ..<input a username, email, and password>
```

##  2. Setup the frontend **next-app**

Open up another terminal (tab or window) and keep your backend running.

```shell
# In the new terminal cd into the next-app directory
cd next-app

# Install all dependencies
yarn install 

# Start your frontend app
yarn dev
```

Opening http://localhost:3000/ in your browser should now show your frontend Next.js app.
