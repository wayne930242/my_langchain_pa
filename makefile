.PHONY: backend frontend runall setup

backend:
	cd backend && poetry run uvicorn api.conversation_chain:app --reload

frontend:
	cd frontend && yarn dev

runall:
	make backend & make frontend

tmux:
	sh rundev.sh

setup: setup-env setup-backend setup-frontend

setup-env:
	@if [ -f .env.local ]; then \
		echo ".env.local already exists. Do you want to overwrite it? (Y/n, default: n)"; \
		read OVERWRITE; \
		if [ "$$OVERWRITE" != "Y" ] && [ "$$OVERWRITE" != "y" ]; then \
			echo "No changes made."; \
			exit 0; \
		fi \
	fi; \
	echo "Please enter your OPENAI_API_KEY (press enter to skip):"; \
	read OPENAI_API_KEY; \
		if [ -n "$$OPENAI_API_KEY" ]; then \
			sed "s/{OPENAI_API_KEY}/$$OPENAI_API_KEY/" .env.local.example > .env.local; \
			echo "API key has been set."; \
		else \
			echo "No changes made."; \
		fi; \
	echo "Do you want to enable DEBUG? (Y/n, default: n)"; \
	read DEBUG; \
		if [ "$$DEBUG" = "Y" ] || [ "$$DEBUG" = "y" ]; then \
			sed -i "s/{DEBUG}/True/" .env.local; \
			echo "DEBUG has been set to True."; \
		else \
			sed -i "s/{DEBUG}/False/" .env.local; \
			echo "DEBUG has been set to False."; \
		fi

setup-backend:
	cd backend && poetry install

setup-frontend:
	cd frontend && yarn install
