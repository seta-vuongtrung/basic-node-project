BINARY_NAME := basic-node-project
PORT := 8000
TAG_DEV := dev
# only for mac m1
DOCKER_ARG := --platform linux/amd64 

build-docker: 
	docker build ${DOCKER_ARG} -t $(BINARY_NAME) .
	
run-docker:
	docker run ${DOCKER_ARG} -d -p $(PORT):$(PORT) $(BINARY_NAME)

#docker login registry-1.docker.io
push-dev:
	docker tag $(BINARY_NAME) registry-1.docker.io/vuongtrungit9x/$(BINARY_NAME):$(TAG_DEV)
	docker push registry-1.docker.io/vuongtrungit9x/$(BINARY_NAME):$(TAG_DEV)