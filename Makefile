BINARY_NAME := basic-node-project
PORT := 8000
TAG_DEV := dev
# only for mac m1
DOCKER_ARG := --platform linux/amd64 

build-docker: 
	docker build ${DOCKER_ARG} -t $(BINARY_NAME) .
	
run-docker:
	docker run ${DOCKER_ARG} -d -p $(PORT):$(PORT) $(BINARY_NAME)

# gcloud auth configure-docker \
    gcr.io
push-gcr:
	docker tag $(BINARY_NAME) gcr.io/woven-operative-403115/$(BINARY_NAME):$(TAG_DEV)
	docker push gcr.io/woven-operative-403115/$(BINARY_NAME):$(TAG_DEV)
