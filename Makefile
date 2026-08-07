.DEFAULT_GOAL := help

DC = docker compose --env-file .env.local

SERVICES := homeassistant mqtt zigbee2mqtt dashboard-proxy dashboard

ZIGBEE_DEVICE := /dev/cu.usbserial-220
ZIGBEE_TCP_PORT := 12345

.PHONY: help env start up build down logs prune

# === ENV ===
env:
	@test -f .env.local || { \
		cp .env .env.local; \
		while IFS= read -r line; do \
			case "$$line" in \
				*=change-me) key=$${line%%=*}; secret=$$(openssl rand -hex 32); \
					sed -i "" "s|^$$key=change-me$$|$$key=$$secret|" .env.local ;; \
			esac; \
		done < .env; \
	}
	@echo ".env.local ready."
	@grep -E '^[A-Z_]+=$$' .env.local && echo "^ fill these in before starting the stack" || true

# === STACK ===
start:
	@killall socat 2>/dev/null; sleep 1
	@test -e $(ZIGBEE_DEVICE) || { echo "Error: SkyConnect not found on $(ZIGBEE_DEVICE)"; exit 1; }
	socat -v TCP-LISTEN:$(ZIGBEE_TCP_PORT),reuseaddr,fork $(ZIGBEE_DEVICE),raw,echo=0,ispeed=115200,ospeed=115200,crtscts=1 > socat.log 2>&1 &
	sleep 2
	brew services start ollama
	$(MAKE) up

up: env
	$(DC) up -d

build: env
	$(DC) up --build -d

build/%:
	$(DC) up --build --no-deps -d $*

down:
	$(DC) down

logs:
	$(DC) logs -f

logs/%:
	$(DC) logs -f $*

# === MISC ===

prune:
	git fetch --prune
	git branch --format '%(refname:short) %(upstream:track)' | awk '$$2 == "[gone]" {print $$1}' | xargs -r git branch -d

# === HELP ===
help:
	@echo " Services : $(SERVICES)"
	@echo ""
	@echo "----- ENV ---------------------------------"
	@echo "  env              -> Generate gitignored .env.local"
	@echo ""
	@echo "----- STACK --------------------------------"
	@echo "  start            -> Full bootstrap: Zigbee bridge + ollama + stack"
	@echo "  up               -> Start the stack"
	@echo "  build            -> Build + start the stack"
	@echo "  build/{service}  -> Rebuild/restart one service"
	@echo "  down             -> Stop the stack"
	@echo "  logs             -> Tail all logs"
	@echo "  logs/{service}   -> Tail one service's logs"
	@echo ""
	@echo "----- MISC ----------------------------------"
	@echo "  prune            -> Delete merged local branches"
	@echo ""
