.PHONY: setup build deploy start clean stop

setup:
	minikube start
	minikube addons enable ingress
	
build:
	minikube image build -t front-img ./frontend
	minikube image build -t back-img ./backend
	

deploy:
	kubectl apply -f k8s/namespace.yaml
	kubectl apply -f k8s/
	kubectl wait --for=condition=Ready pod -l app=database -n application --timeout=120s
	kubectl exec -i deployment/postgres-deployment -n application -- psql -U postgres -d projet < database/init.sql
	kubectl rollout status deployment/back-deployment -n application
	kubectl rollout status deployment/front-deployment -n application


start: build deploy
	@echo "Application démarrée"
	@echo "Minikube IP : $$(minikube ip)"

clean:
	kubectl delete -f k8s/

stop:
	minikube stop