#!/bin/bash
# To kill server, detach from tmux (Ctrl + b, d) and then run tmux kill-server

tmux kill-server
tmux new-session -d
tmux new-session -d
tmux split-window -h
tmux send -t 1:0.0 "cd dj-api && poetry run ./manage.py runserver" C-m
tmux send -t 1:0.1 "cd next-app && yarn install && yarn dev" C-m
tmux -2 attach-session -d
