const express        = require('express');
const logger         = require('morgan');
const path           = require('path');
const bodyParser     = require('body-parser');


const homeRoute      = require('./routes/home');
const dropsRoute     = require('./routes/drops');

const app            = express();
const PORT          = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/drops', dropsRoute)
app.use('/', homeRoute);


app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
