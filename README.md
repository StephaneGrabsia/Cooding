# uQuizz

TDLOG project : building of a web app in order to make python formations and code learning great again !

* Back-end framework : django + REST API
* Front-end framework : ReactJS + Sass
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

PLEASE WAIT STARTING OF THE FRONT, it shoud take few minutes.

You can now access the app (on port 8000 for the back and 8080 for the front which can be change in [env file](.env)) by :
* [localhost:8000](localhost:8000) for the back
* [localhost:8080](localhost:8080) for the front

---

⚠️ If you have an error when trying to up such like 
```bash
db_1    | running bootstrap script ... 2022-10-28 09:09:46.894 UTC [83] FATAL:  data directory "/var/lib/postgresql/data" has wrong ownership
db_1    | 2022-10-28 09:09:46.894 UTC [83] HINT:  The server must be started by the user that owns the data directory.
db_1    | child process exited with exit code 1
db_1    | initdb: removing contents of data directory "/var/lib/postgresql/data" uquizz_db_1 exited with code 1
```
you might have permission issues when mounting the folder to the docker containers. **We suggest you to clone the project into a drive, which is formatted in a native Linux filesystem.**

## Access to database

You can access to the PostgreSQL database shell (in the assigned docker container) by running :

```bash
docker exec -it $(docker ps -f 'name=db' --format '{{.ID}}') psql -U uquizz
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

## Add a Python dependancy

To manage dependancy on the backend, we are using [poetry](https://python-poetry.org/). To add a Python module, you should add it on [pyproject file](/back/pyproject.toml) and then re-build the back Docker container.

## Operate on the front-end

You can access the front-end docker container by running :

```bash
docker-compose exec front /bin/sh
```

To start/restart the webpack dev server, run on the container :
```bash
/usr/local/bin/npm run dev
```

## Add a Node dependancy

To manage dependancy on the backend, we are using [npmJS](https://www.npmjs.com/). To add a Node module, you should add it on [package.json](/front/package.json) and then re-build the back Docker container.

You can also execute in the front-end container :
```bash
/usr/local/bin/npm install [your-package-name] -D
```
Then, the [package.json](/front/package.json) will be automatically update.

## Environment

| Variable | Description | Dev value |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------|------------------|
| DB_HOST | Host name of the db | db |
| DB_PORT | Port of the DB (in container). | 5432 |
| DB_USER | User of the DB | uquizz |
| DB_NAME | Name of the DB | uquizz |
| DB_PASSWORD | Password of the DB | uquizz |
| BACK_PORT | External back port access | 8000 |
| FRONT_PORT | External front port access | 8080 |
| SECRET_KEY | Django secret key | ChangeThatPlease |
| DEBUG | Debug mode execution | True |
| DOMAIN_NAME | Domaine name use in production. Requests from other domain will be rejected. | uquizz.enpc.org |
| SECURE_SSL_REDIRECT | Automaticly redirect non HTTPS requests in HTTPS. To be leave at False if an other proxy is already doing this work | False |

  

Command to run to generate a secret django key (you should get django installed)

```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```
