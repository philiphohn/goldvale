#!/bin/bash

PORT=2250

echo "Checking for processes on port $PORT..."
PID=$(lsof -t -i:$PORT)

if [ ! -z "$PID" ]; then
  echo "Killing process $PID on port $PORT..."
  kill -9 $PID
else
  echo "No existing process found on port $PORT."
fi

echo "Scheduling browser to open..."
(sleep 4 && open "http://localhost:$PORT") &

echo "Starting Next.js dev server on port $PORT..."
npm run dev -- -p $PORT
