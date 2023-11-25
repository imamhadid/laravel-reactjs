# Laravel 9.0 (PHP) & Reactjs (Typescript) 18.2 Docker Compose

The following are separate packages between Laravel and ReactJS that run in each env
Laravel can be used only as a backend-api and for ReactJS it can be used as a frontend, using MySQL as the data base.

# Installation

1.  install [docker](https://docs.docker.com/engine/) & [docker-compose v3](https://docs.docker.com/compose/compose-file/compose-file-v3/) or [docker desktop](https://www.docker.com/get-started/)
1. `docker-compose up -d` or [VSCode Extension](https://github.com/microsoft/vscode-docker) or [jetBean Plugin](https://plugins.jetbrains.com/plugin/7724-docker)

just run and ez too use


## Using For Develop Mode

run docker compose
`docker compose start laravel-reactjs` or run from docker desktop or docker vscode/jetbean

1. Laravel

    1. go to terminal docker laravel `docker exec -it laravel-app /bin/bash`

    1. create env at folder laravel `cp .env.example .env`

    1. run key artisan `php artisan key:generate`

    1. run migrate artisan `php artisan migrate`

    1. run serve artisan `php artisan serve`

1. Reactjs

    1. already run serve

    1. open browser `localhost:3000`

## Backend Test (Swagger Documentation)


list documentation api `http://localhost:8000/api/documentation`

this swagger using [L5-Swagger](https://github.com/DarkaOnLine/L5-Swagger)

read example api for detail [here](https://github.com/zircote/swagger-php/tree/master/Examples/petstore-3.0)


Support Me [Buy Coffe](https://sociabuzz.com/hadit120/tribe)