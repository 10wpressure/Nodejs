NAME  =	ethereum/client-go:latest

default:  
	run 

build:
	docker  build -t $(NAME) .

push: 
	docker  push $(NAME)

debug:    
	docker  run --rm -it $(NAME) /bin/bash

try:
	docker run --rm $(NAME)

stop:
	docker stop besu

run:
	docker run --rm --name geth -p 30303:30303 -p 8546:8546 -p 8545:8545	-v /home/boriskuznetsov/docker/geth:/root/.ethereum $(NAME) --dev --http --http.addr 0.0.0.0