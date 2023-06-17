# Health Care
Hi! This is a web application for health care.

Build with `NextJS 13` + `TailWind CSS` + `redux-toolkit` + `Material UI` + `React ChartJS 2`.

Mock data using `lowdb` and save in `/src/mock/db.json`.

Authenticate with `next-auth`.

**Requirement:**
Minimum `NodeJS` version `14.18.0`

## How to
###	Install
    npm install
or

    yarn install
### Run development (debug)
	npm run dev
or 

    yarn dev
### Build production (release)
	npm run build
or

    yarn build
### Run production (release) (only run after build production)
	npm run start
or

    yarn start

## User account (account / password)
`user1 / 123456`

`user2 / 123456`

## Pages
1. Top Page:
	Pathname: /
	Login required: YES
	If you are not logged in, you will be redirected to the Login Page
2. My Record Page:
	Pathname: /my-record
	Login required: YES
	If you are not logged in, you will be redirected to the Login Page
3. Column Page:
	Pathname: /column
	Login required: NO
4. Login Page:
	Pathname: /login
	Login required: NO.
	If you are logged in, you will be redirected to the Top Page.