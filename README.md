# Requirements

- [Python 3.8+](https://www.python.org/downloads/)
- [Poetry](https://python-poetry.org/docs/#installation) (optional)
- [Node.js 16+](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional: npm can be used instead)
- [make](https://www.gnu.org/software/make/) (optional: jump to [Slow start](#slow-start) if you don't have it)

# Quick start

If you have all the requirements installed, you can run the following commands to start the app.

```shell
# Setup all the things
make setup

# Run all the things
make runall
# Or if you installed tmux
make tmux

# Run the backend
make backend

# Run the frontend
make frontend
```

# Slow start

If you don't have `make` installed, you can follow the steps below to start the app.

## 1. Environment variables

```shell
# Create a .env.local file
cp .env.local.example .env.local
```

And fill in the values for the environment variables.

## 2. Setup the backend

Launch the backend server first.

Or

```shell
cd backend

# Download necessary packages
poetry install
# or
pip install -r requirements.txt

# Start your backend server
poetry run uvicorn api.conversation_chain:app --reload
# or
python uvicorn api.conversation_chain:app
```

## 3. Setup the frontend

Open up another terminal (tab or window) and keep your backend running.

```shell
# In the new terminal cd into the next-app directory
cd frontend

# Install all dependencies
yarn install 

# Start your frontend app
yarn dev
```

Opening http://localhost:3000/ in your browser should now show your frontend Next.js app.

## Shell script for starting frontend and backend at the same time using tmux

Requirement: Unix like shell, zsh or bash; tmux installed.

In project folder "my_langchain_pa", you can use rundev.sh to start the app.

```shell
./rundev.sh
```

# Refernce

## Credit

- [fastapi-async-langchain](https://github.com/ajndkr/fastapi-async-langchain) for backend
- [langchain-chat-nextjs](https://github.com/zahidkhawaja/langchain-chat-nextjs) for quick start
