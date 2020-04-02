const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipelistRouter = require('./routes/recipelist');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
};

const app = express();
app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors(corsOptions));

app.use(session({
  store: new FileStore(),
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  is_logged_in: false,
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipelist', recipelistRouter);


module.exports = app;
