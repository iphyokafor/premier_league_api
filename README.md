# premier_league_api
An API that serves the latest scores of fixtures of matches in a “Mock Premier League”.


 It is built on top of NodeJS, Express, Typegoose, mongoDB, Mongoose, Docker, Redis, and JsonWebToken. It is higly flexible because it provides the following features:

- **Admin accounts** which are used to

  - signup/login
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)
  - Generate unique links for fixture

- **Users accounts** who can

  - signup/login
  - view teams
  - view completed fixtures
  - view pending fixtures
  - robustly search fixtures/teams

- Only the search API should be availble to the public.


# Getting Started
To obtain the postman documentation [url](https://documenter.getpostman.com/view/8629267/UzXLzJ1y)

To obtain a copy of this app download or clone the repository at this [url](https://github.com/iphyokafor/premier_league_api)

To obtain the link to deployment on heroku [url](https://sandie-league.herokuapp.com/api/premier_league_api)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run start:dev' to start the application
- In a browser address bar navigate to `http://localhost:${PORT}` with your preferred PORT on env

## Docker
 - To start the docker containers on your terminal run `docker-compose up -d`

## Built With

- NodeJs
- Express
- Typescript
- Mongodb(database)
- typegoose
- Deployed on Heroku

## Author

- [iphyokafor](https://github.com/iphyokafor)
