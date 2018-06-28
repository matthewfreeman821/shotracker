const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

// const setupAuth = require('./auth');
// const ensureAuthenticated = require('./auth').ensureAuthenticated;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const ShotTracker = require('./db');


const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const static = express.static;
app.use(static('public'));

// setupAuth(app);

// LOGIN PAGE/NAV
app.get('/', (req, res) => {
    res.render('homepage');
});

// LIST ALL USER INFO
app.get('/info', (req, res) => {
    ShotTracker.getAllUsersById(1)
        .then((data) => {
            console.log(data);
            res.render('infopage', {
                Users: data,
                // isLoggedIn: req.isAuthenticated()
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

// LIST ALL MEDS
app.get('/med', (req, res) => {
    ShotTracker.getAllMedicineByUserId(1)
        .then((data) => {
            console.log(data);
            res.render('medpage', {
                Medicine: data,
                // isLoggedIn: req.isAuthenticated()
            });
        })
        .catch((error) => {
            console.log(error);
        });
});


// LIST ALL SHOT RECORDS
app.get('/record', (req, res) => {
    ShotTracker.getAllShot()
        .then((data) => {
            console.log(data);
            res.render('recordpage', {
                Shot: data,
                // isLoggedIn: req.isAuthenticated()
            });
        })
        .catch((error) => {
            console.log(error);
        });
});




// LISTEN FOR LOCALHOST SERVER

app.listen(3000, () => {
    console.log('Your server is running!');
});