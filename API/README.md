# How to install and configuration

## Please access the .env.example

```
PORT=
DB_USER=postgres // You can using other SQL database
DB_PASSWORD=
DB_NAME=
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development

USER_ID=5e03ef6e-efda-4cc2-841f-efaccdb10637

JWT_SECRET_KEY_REFRESH=
JWT_SECRET_KEY_ACCESS=
JWT_ACC_TIME=15m // 15 minutes for access token
JWT_REFRESH_TIME=1w // 1 week for refresh token
```

You can fill in according to the existing conditions and put in .env file

### After you finish configuration. Just Install all depedencies

`npm install` or `yarn install`

Note: Make sure you're in the appropriate folder

### After installation finished, just migrate the migrations and seeders file to database

`npm sq:cms` or `yarn sq:cms`

### You can start after all the steps

`npm start` or `yarn start`

## Look this is the documentation with Postman

1. You can import with our file: `All endpoint.postman_collection.json`

2. This is the link: `https://www.postman.com/winter-shuttle-514865/workspace/yantech`
