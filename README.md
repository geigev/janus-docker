# janus-docker

This is a dockerized version of the Janus-Gateway https://github.com/meetecho/janus-gateway

## Basic Instructions

```shell
git clone git@github.com:geigev/janus-docker.git
cd janus-docker
git submodule init
git submodule update
docker-compose build
docker-compose up
```
You may have to manually navigate to https://127.0.0.1:8089 to allow the janus certificate

If you would like to run Janus with Address Sanitizer (for debugging) use
```shell
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose.debug.yml build
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
```

For more information about debugging, see https://janus.conf.meetecho.com/docs/debug.html

## Running other branches

Running other branches is easy!

```shell
cd janus-gateway
git fetch
git checkout refcount #or any other branch
cd ..
docker-compose build
docker-compose up
```

