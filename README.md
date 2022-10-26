# uQuizz

TDLOG project : building of a web app in order to make python formations and code learning great again !

* Back-end framework : django + REST API
* Front-end framework : ReactJS
* Database : PostgreSQL

  
## Installation of app

To build docker images of containers you should run :

```bash
docker-compose build
```
To run the app on local machine you should run :

```bash
docker-compose up -d
```

You can now access the app (on port 8000 which can be change in [env file](.env)) by `localhost:8000`.

  

## Access to database

You can access to the PostgreSQL database shell (in the assigned docker container) by running :

```bash
docker exec -it $(docker ps -f 'name=db' --format '{{.ID}}') psql -U upont
```

## Operate on the back-end

You can access the back-end docker container by running :

```bash
docker-compose exec back /bin/bash
```

To create a super user from the back-end, you should run :

```bash
python manage.py createsuperuser
```

To create migration from the back-end (TO BE DONE AFTER MODEL MODIFICATIONS), you should run :

```bash
python manage.py makemigrations
```

To execute migrations, you shoud run (automaticly done at container starting) :

```bash
python manage.py migrate
```

  

## Environment

| Variable | Description | Dev value |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------|------------------|
| DB_HOST | Host name of the db | db |
| DB_PORT | Port of the DB (in container). | 5432 |
| DB_USER | User of the DB | uquizz |
| DB_NAME | Name of the DB | uquizz |
| DB_PASSWORD | Password of the DB | uquizz |
| BACK_PORT | External port back access | 8000 |
| SECRET_KEY | Django secret key | ChangeThatPlease |
| DEBUG | Debug mode execution | True |
| DOMAIN_NAME | Domaine name use in production. Requests from other domain will be rejected. | uquizz.enpc.org |
| SECURE_SSL_REDIRECT | Automaticly redirect non HTTPS requests in HTTPS. To be leave at False if an other proxy is already doing this work | False |

  

Command to run to generate a secret django key (you should get django installed)

```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```