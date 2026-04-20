.PHONY: help build up down logs clean rebuild

help:
	@echo "CTF Writeup Hub - Docker Commands"
	@echo ""
	@echo "  make build     - Build Docker images"
	@echo "  make up        - Start all services"
	@echo "  make down      - Stop all services"
	@echo "  make logs      - View logs"
	@echo "  make clean     - Remove containers and volumes"
	@echo "  make rebuild   - Rebuild and restart services"
	@echo ""
	@echo "Access:"
	@echo "  Frontend: http://localhost"
	@echo "  Backend:  http://localhost:8000"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	rm -f src/backend/ctf_writeups.db

rebuild:
	docker-compose down
	docker-compose build
	docker-compose up -d