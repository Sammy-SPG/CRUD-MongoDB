const express = require('express');
require('ejs');
const path = require('path');
const homeRouters = require('./rounters/homeRouters');

const app = express();


app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(homeRouters);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(app.get('port'), () => console.log(`Example app listening on port ${app.get('port')}!`));