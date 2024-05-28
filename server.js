const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// import seeds file
const seedDataBase = require('./seeds/seeds');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret is purple',
    cookie: {
        maxAge: 600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
  };

  app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// start the server after determine to execute seeding first
const startServer = () => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
};

if (process.env.RUN_SEEDS === 'true') {
  // try seeding the database
  seedDataBase().then(() => {
      console.log('Seeding completed!');
      sequelize.sync({ force: false }).then(startServer);
  }).catch(err => {
      console.error('Error during Seeding process: ', err);
      // Still start server even if seeding fails
      sequelize.sync({ force: false }).then(startServer);
  });
} else {
  // no seeding - just start server
  sequelize.sync({ force: false }).then(startServer);
}

