# agenda

_stay organized_<br>

'Agenda' is a collaborative task management tool to keep track of your projects. Create a personal or team board where you can add tasks, add team members to tasks, and keep track of the progress you make along the way.

## Demo

**_Check us out at your-agenda.herokuapp.com_**

## Set Up

First, fork this repo! Then, to run this app on your local machine:

Mac/OS/Linux

1.  `npm install`
2.  `npm start`
3.  Create `agenda` and `agenda-test` database.
4.  In a separate terminal window, run `npm run seed` to seed the database.

Windows

1.  `npm install`
2.  `npm run build-watch` to start the webpack process
3.  Create `agenda` and `agenda-test` database.
4.  In a separate terminal window, run `npm run start-server` to start the server process.
5.  In a separate terminal window, run `npm run seed` to seed the database.

The app should open in localhost:8080.

IF you need to change the port, you can change it in server/index.js on line 10.

<strong>Setting Up Google OAuth</strong>

 <p>In your dev environment, you can keep all of your app's secret API keys in a file called <code>secrets.js</code>, in your project root. This file is included in the <code>.gitignore</code> - it will <strong>NOT</strong> be tracked or show up on Github. On your production server, you can add these keys as environment variables, so that they can still be read by the Node process on <code>process.env</code> </p>

## Tools

Agenda was created with:

```
* NodeJS
* ExpressJS
* React
* Redux
* PostgreSQL
* Sequelize
* PassportJS
* Socket.io
* Google OAuth
* Material UI
* React Beautiful DND
```

## People

The original authors of Agenda are:

* [Allyson Camitta](https://github.com/camitta)
* [Katie Weinstein](https://github.com/katieweinstein)
* [Kathy Morawski](https://github.com/kmorawski94)
* [Ako Sorensen](https://github.com/akosorensen)
