const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const checkForSession = require('./middleware/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

app.use(bodyParser.json());
app.use(session ({
  secret: 'asadlkfjlla239458tuorjhgnf',
  resave: false,
  saveUninitialized: false,
  }));
app.use(checkForSession);
app.use(express.static( `${__dirname}/../public/build` ));

app.get('/api/swag', swagController.read);

app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);

app.get('/api/search', searchController.search);

const port = 3000;
app.listen(port, () => {console.log('server listening on port', port)});
