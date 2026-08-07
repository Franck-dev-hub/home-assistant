# Home assistant config

## Description

After many years with HAOS (Home Assistant Oparating System), I moved on HA with docker compose.<br>
The goal is to have a full control on my HA and deploy it on my local server.

> ⚠️ You are on IOS branch ⚠️

## Table of contents

- [Description](#description)
- [Table of contents](#table-of-contents)
- [Technologies used](#technologies-used)
- [Installation and run](#installation-and-run)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Help](#help)
- [License](#license)

## Technologies used

| Section            | Tool                                                                                                                                                                                                                                                                                                                           |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Software           | ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?logo=docker&logoColor=fff) ![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=fff)                                                                                                                                                    |
| Hardware           | ![SkyConnect](https://img.shields.io/badge/SkyConnect-ZBT--1-gray?logo=zigbee&logoColor=fff&labelColor=007ACC) ![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=fff)                                                                                                                                       |
| Core               | ![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?logo=homeassistant&logoColor=fff) ![Zigbee2MQTT](https://img.shields.io/badge/Zigbee2MQTT-E87E04?logo=zigbee2mqtt&logoColor=fff) ![Mosquitto](https://img.shields.io/badge/Mosquitto-Broker-gray?logo=eclipsemosquitto&logoColor=fff&labelColor=3C2257) |
| Dashboard          | ![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vuedotjs&logoColor=fff) ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)                                                                                                                                                         |
| Protocol & drivers | ![MQTT](https://img.shields.io/badge/MQTT-660066?logo=mqtt&logoColor=fff) ![Zigbee](https://img.shields.io/badge/Zigbee-EB0443?logo=zigbee&logoColor=fff)                                                                                                                                                                      |

<a id="installation-and-run"></a>
<details>
<summary><span style="font-size: x-large; font-weight: bold; border-bottom: 1px solid #5e97fe">Installation and run</span></summary>

1. Clone the repository

```bash
git clone https://github.com/Franck-dev-hub/home-assistant
cd home-assistant
```

2. Install npm (If needed)

```bash
nvm install 22
nvm use 22
```

3. Install Zigbee2mqtt

```bash
git clone https://github.com/Koenkk/zigbee2mqtt.git
cd zigbee2mqtt
npm install
```

4. Create zigbee config file (copy paste in your terminal)

```bash
mkdir -r zigbee2mqtt/data/configuration.yaml
touch zigbee2mqtt/data/configuration.yaml
cat <<EOF > zigbee2mqtt/data/configuration.yaml
homeassistant:
  enabled: true

mqtt:
  base_topic: zigbee2mqtt
  server: mqtt://mqtt:1883

serial:
  port: tcp://host.docker.internal:12345
  adapter: ember
  rtscts: true

frontend:
  enabled: true
  port: 8080
  host: 0.0.0.0
EOF
```

5. Find dongle location

```bash
ls /dev/cu.usb*
```

6. Generate your local env file

```bash
make env
```

Copies the tracked `.env` (placeholders, no secrets) into a gitignored `.env.local`. `HA_TOKEN` is left blank — fill it
in with a Home Assistant long-lived access token. Other `change-me` placeholders get a random value automatically.

> If you have a backup, you can restore connected devices by coping `zigbee2mqtt/data/database.db`

7. Launch the project

```bash
make start
```

Bootstraps the Zigbee serial→TCP bridge (SkyConnect via socat), starts ollama, then the whole stack. If the bridge and
ollama are already running, `make up` (or `make build` to rebuild images first) is enough.

</details>

## Usage

Services run on the `smarthome` Docker bridge network and talk to each other by service name. Published ports on the
host:

| Service        | URL                   |
|----------------|-----------------------|
| Home assistant | http://localhost:8123 |
| Zigbee2MQTT    | http://localhost:8080 |
| Dashboard      | http://localhost:8880 |

## Project structure

| File / folder        | Purpose                                                           |
|----------------------|-------------------------------------------------------------------|
| docker-compose.yaml  | Service definitions                                               |
| Makefile             | Project command shortcuts                                         |
| .env                 | Tracked placeholders                                              |
| .env.local           | Gitignored, real values (`make env` then populate manually)       |
| dashboard            | Dashboard frontend see [dashboard/README.md](dashboard/README.md) |
| dashboard-proxy      | Node proxy holding the HA token                                   |
| homeassistant_config | Home Assistant config (mostly gitignored, only YAML tracked)      |
| mosquitto            | Mosquitto MQTT broker config, data and logs                       |
| zigbee2mqtt          | Zigbee2MQTT source, cloned separately (see step 3 above)          |
| README.md            | This file                                                         |
| LICENSE              | GNU AGPL v3.0                                                     |

## Help

> If you encounter issues

- ![Docker Compose v5.0.2](https://img.shields.io/badge/Docker-Compose%20v5.0.2-gray?logo=docker&logoColor=fff&labelColor=2496ED)
  or higher is installed
- Check logs

```bash
make logs
# or a single service:
make logs/dashboard-proxy
```

## License

This project is licensed under GNU AGPL v3.0 - see the LICENSE.txt file for details.

# WIP

- Moonraker
- Windy
- Spotify
- Telegram
- Thread
- Toyota EU
- Tuya
- Traduction