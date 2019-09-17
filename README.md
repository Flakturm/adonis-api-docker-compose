
# Adonis API with production-ready docker-compose application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Redis
7. Kue (Queue)
8. Swagger 2 docs (./docs/swagger)
9. PostgreSQL

## Clone
Install the blueprint
```bash
git clone --dissociate https://github.com/Flakturm/adonis-api-docker-compose
```

## Setup dev enviornment
For example: **adonis-is.cool**
Add it in **/etc/hosts**
```bash
sudo nano /etc/hosts
```
```
127.0.0.1	adonis-is.cool
```

## Setup nginx reverse proxy
NginxReverseProxy listen 80 port and proxying traffic to your app.
```bash
cd docker/reverseProxy/ && docker-compose up -d && cd ../../
```

## Development environment .env
Copy .env.example to .env and fill in **SITE_URL**.
Change DB user and password if needed.
```
SITE_URL=adonis-is.cool
# development
DOCKER_APP_COMMAND='adonis serve --dev'
DOCKER_KUE_COMMAND='yarn run dev-kue'
DOCKER_SCHEDULER_COMMAND='yarn run dev-scheduler'
```
## Production environment .env
Uncomment three docker commands and comment out development variables above.
Change DB user and password if needed.
```
SITE_URL=adonis-is.com
# production
DOCKER_APP_COMMAND='yarn run start'
DOCKER_KUE_COMMAND='yarn run kue'
DOCKER_SCHEDULER_COMMAND='yarn run scheduler'
```

## Start
```bash
docker-compose up -d
```

## Instal dependencies && generate key

```bash
docker-compose exec app bash -c 'yarn install && adonis key:generate'
```

## Restart conatiners

```bash
docker-compose restart
```

## Open your app in browser
URL:  http://adonis-is.cool

## Migrations

Run the following command to run startup migrations.

```bash
docker-compose exec app bash -c 'adonis migration:run'
```

## Work inside the container for use specific adonis commands...

Run the following command to run startup migrations.

```bash
docker-compose exec app bash
```

## View logs

For all containers

```bash
docker-compose logs -f
```

Or selected container

```bash
docker-compose logs -f app
```

## Troubleshooting
If you get nginx "Not found error":
```bash
docker-compose restart
```

Or view logs and find bugs
```bash
docker-compose logs -f web
```
