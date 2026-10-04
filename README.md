# Application de gestion de projets

Développement d'une application web de gestion de projets et de tâches.

## Table des matières

- [Technologies](#technologies)
- [Fonctionnalités](#fonctionnalités)
- [Prérequis](#prérequis)
- [Utilisation](#utilisation)
- [Architecture](#architecture)
- [Auteur](#auteur)

## Technologies

- Frontend : HTML / CSS / JavaScript
- Backend : Node.js / Express
- Base de données : PostgreSQL
- Conteneurisation : Docker
- Orchestration : Kubernetes / Minikube

## Fonctionnalités

- Création de projets
- Suppression de projets
- Création de tâches associées à un projet
- Suppression de tâches
- Gestion du statut des tâches
- Gestion de la priorité des tâches

## Prérequis

Pour lancer l'application, les outils suivants doivent être installés :

- Docker
- Minikube
- kubectl
- Make

## Utilisation

L'application peut être lancé de deux manières différentes:

Pour lancer l'application avec docker compose il faut utiliser la commande suivante:
```bash
docker compose up --build
```

Pour lancer l'application kubernetes il faut utiliser la commande suivante:
```bash
make start
```

De plus, pour pourvoir utiliser le fichier .env il faut utilser la commande:
```bash
cp backend/.env.example backend/.env
```
Il faut également penser à changer le mot de passe de la base de données dans le fichier .env ainsi que dans le ficher secret.yaml et le fichier docker-compose.yml.

Ensuite, pour accéder à l'application :

- Avec Docker Compose : http://localhost:8080/
- Avec Kubernetes : l'adresse fournie à la fin de l'exécution de la commande

## Architecture

```
                    Utilisateur
                         |
                         v
                  +-------------+
                  |   Ingress   |
                  +------+------+
                         |
              +----------+----------+
              |                     |
              v                     v
        +-----------+         +-----------+
        | Frontend  |         |  Backend  |
        |   NGINX   |         | Node.js   |
        |           |         |  Express  |
        +-----------+         +-----+-----+
                                    |
                                    v
                              +-----------+
                              | PostgreSQL|
                              +-----------+
```

### Auteur

L'auteur de ce projet est:
- Tristan Roussat