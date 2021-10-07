NAME  =	hyperledger/besu:latest

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
	docker run --rm --name besu -p 30303:30303 -p 8546:8546 -p 8545:8545 --mount type=bind,source=/home/boriskuznetsov/docker/besu-rinkeby,target=/var/lib/besu hyperledger/besu:latest --network=dev --rpc-http-enabled --rpc-ws-enabled --data-path=/var/lib/besu