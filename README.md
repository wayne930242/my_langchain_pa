## 1. Setup the backend **Dj-api**

```shell
cd dj-api

# Download necessary packages
poetry install

# Make database migrations
peotry run ./manage.py makemigrations
poetry run ./manage.py migrate 

# Create admin superuser
poetry run ./manage.py createsuperuser
..<input a username, email, and password>

# Populate your database with initial data from the dj-api/api/fixtures directory
poetry run ./manage.py loaddata fixture
```

The terminal should output: `Installed 30 object(s) from 1 fixture(s)`.

If an error message appears then run `poetry ./manage.py migrate --run-syncdb` and `poetry ./manage.py migrate` first 
and then `poetry ./manage.py loaddata fixture` should work.

## 2. Confirm your backend is functioning

```shell
poetry run ./manage.py runserver
```

Now navigate to http://127.0.0.1:8000/api
and confirm the initial data was loaded properly.

<p align="center">
  <img src="https://user-images.githubusercontent.com/64326462/126901766-e187377d-5b0d-4b75-835f-5dc1d0374094.png"
    alt="screenshot-of-api" align="center" width="50%">
</p>

</br>

##  Setup the frontend **next-app**

Open up another terminal (tab or window) and keep your backend running.

```shell
# In the new terminal cd into the next-app directory
cd next-app

# Install all dependencies
yarn install 

# Create a .env.local file with backend api endpoint inside
cp .env.example .env.local

# In your text editor put the following line in your .env.local file
DJANGO_API=http://localhost:8000/api

# Start your frontend app
yarn dev

# or
npm run dev
```

Opening http://localhost:3000/ in your browser should now show your frontend Next.js app.
