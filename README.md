# Home assistant config
## Description
After many years with HAOS (Home Assistant Oparating System), I moved on HA with docker compose.<br>
The goal is to have a full control on my HA and deploy it on my local server.

> ⚠️ You are on IOS branch ⚠️

## Table of contents
- [Description](#description)
- [Table of contents](#table-of-contents)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Technologies used](#technologies-used)
  - [Installation and run](#installation-and-run)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Help](#help)
- [Authors](#authors)
- [License](#license)

## Getting started
### Prerequisites
#### Software
-  ![Docker v29.2.1](https://img.shields.io/badge/Docker-v29.2.1-gray?logo=docker&logoColor=fff&labelColor=2496ED) or higher.
-  ![Docker Compose v5.0.2](https://img.shields.io/badge/Docker%20Compose-v5.0.2-gray?logo=docker&logoColor=fff&labelColor=2496ED) or higher.
- ![npm](https://img.shields.io/badge/npm-v20.20-gray?logo=npm&logoColor=fff&labelColor=CB3837)
- Tested on ![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=fff)

#### Hardware
- ![SkyConnect](https://img.shields.io/badge/SkyConnect-ZBT--1-gray?logo=zigbee&logoColor=fff&labelColor=007ACC) dongle
- ![iOS](https://img.shields.io/badge/iOS-000000?&logo=apple&logoColor=fff) server


### Technologies used
#### Core services
- ![Home Assistant](https://img.shields.io/badge/Home-Assistant-18BCF2?logo=homeassistant&logoColor=fff&labelColor=18BCF2)
- ![Zigbee2MQTT](https://img.shields.io/badge/Zigbee2MQTT-2.9.0-gray?logo=zigbee2mqtt&logoColor=fff&labelColor=E87E04)
- ![Mosquitto](https://img.shields.io/badge/Mosquitto-Broker-gray?logo=eclipsemosquitto&logoColor=fff&labelColor=3C2257)

#### Protocol & drivers
- ![MQTT](https://img.shields.io/badge/MQTT-Protocol-gray?logo=mqtt&logoColor=fff&labelColor=660066)
- ![Zigbee](https://img.shields.io/badge/Zigbee-Driver-gray?logo=zigbee&logoColor=fff&labelColor=EB0443)

### Installation and run
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

6. Set .env variables

```bash
cp .env.exemple .env
```

> Then paste the dongle path in `.env` file

7. Launch docker compose

```bash
docker compose up -d
```

## Usage
Since the stack uses `network_mode: host`, all services are accessible via localhost.

> HA localhost access

```bash
http://localhost:8123
```

> Zigbee2MQTT access

```bash
http://localhost:8080
```

## Project structure
```tree
.
├── docker-compose.yaml
├── .env
├── homeassistant_config
├── mosquitto
│     ├── config
│     │     ├── mosquitto.conf
│     │     └── passwd
│     ├── data
│     └── log
├── README.md
└── zigbee2mqtt
        └── data
                └── configuration.yaml
```

## Help
> If you ecounter issues

- Check logs
```bash
docker compose logs
```

- ![Docker Compose v5.0.2](https://img.shields.io/badge/Docker-Compose%20v5.0.2-gray?logo=docker&logoColor=fff&labelColor=2496ED) or higher is installed.

## Authors
- **Franck Spadotto** [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=fff)](#https://github.com/Franck-dev-hub)

## License
This project is licensed under GNU AGPL v3.0 - see the LICENSE.txt file for details.
