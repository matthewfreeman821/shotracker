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
    ShotTracker.getAllUsersById(7)
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

// CREATE NEW USER
app.get('/newinfo', (req, res) => {
    console.log('This is the /newinfo route');
    res.render('info-create-page');
});

app.post('/newinfo', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')
 
    ShotTracker.addUser('12',
    req.body.LastName,
    req.body.FirstName,
    req.body.Email,
    req.body.Age,
    req.body.Height,
    req.body.Weight,
    req.body.Gender,
    req.body.Ethnicity)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/info`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// LIST ALL MEDS
app.get('/med', (req, res) => {
    ShotTracker.getAllMedicineByUserId(3)
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

// CREATE NEW MED
app.get('/newmed', (req, res) => {
    console.log('This is the /newmed route');
    res.render('med-create-page');
});

app.post('/newmed', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')

    ShotTracker.addMed(
    req.body.MedName,
    '7',
    req.body.AmtAvail,
    req.body.LotNum,
    req.body.ExpDate)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/med`);
    })
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

// CREATE NEW SHOT RECORD
app.get('/newrecord', (req, res) => {
    console.log('This is the /newrecord route');
    res.render('shot-create-page');
});

app.post('/newrecord', (req, res) => {
    console.log(req.body);
    // res.send('hey you submitted the form')

    ShotTracker.addShot(
    '4',
    req.body.ShotTime,
    req.body.ShotLocation,
    req.body.Notes)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/record`);
    })
});


// LISTEN FOR LOCALHOST SERVER

app.listen(3000, () => {
    console.log('Your server is running!');
});