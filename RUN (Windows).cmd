@echo off
docker compose down --remove-orphans
docker compose up -d --build
start http://localhost:3001
start http://localhost:3000
pause