#!/bin/bash
# To kill server, detach from tmux (Ctrl + b, d) and then run tmux kill-server

tmux kill-server

tmux new-session -d
tmux split-window -h
tmux send -t 0:0.0 "cd backend && poetry run uvicorn api.conversation_chain:app --reload" C-m
tmux send -t 0:0.1 "cd frontend && yarn dev" C-m
tmux -2 attach-session -d
