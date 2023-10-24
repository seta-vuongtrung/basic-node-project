BINARY_NAME := basic-node-project
PORT := 8000
TAG_DEV := dev
TAG_UAT := uat
# only for mac m1
DOCKER_ARG := --platform linux/amd64 

build-docker: 
	docker build ${DOCKER_ARG} -t $(BINARY_NAME) .
	
run-docker:
	docker run ${DOCKER_ARG} -d -p $(PORT):$(PORT) $(BINARY_NAME)

push-dev:
	docker tag $(BINARY_NAME) asia-southeast1-docker.pkg.dev/rse-sep-ii/rse-sep-ii/$(BINARY_NAME):$(TAG_DEV)
	docker push asia-southeast1-docker.pkg.dev/rse-sep-ii/rse-sep-ii/$(BINARY_NAME):$(TAG_DEV)