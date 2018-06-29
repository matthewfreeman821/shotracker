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

// USER ROUTES-------------------------------------------------------------------------------

// LIST ALL USER INFO
app.get('/info', (req, res) => {
    ShotTracker.getUserById(1)
        .then((data) => {
            console.log(data);
            res.render('infopage', data);
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

// EDIT USER INFO BY ID
app.get('/:id/info', (req, res) =>{
    ShotTracker.getUserById(1)
        .then((data) =>{
            console.log(data);
            res.render('info-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.post('/:id/info', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setUserById(
        req.params.id, 
        req.body.LastName, 
        req.body.FirstName, 
        req.body.Email, 
        req.body.Height, 
        req.body.BodyWeight, 
        req.body.Age, 
        req.body.Gender, 
        req.body.Ethnicity)
    .then((data) => {
        console.log(data);
        res.redirect(`/info`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// MED ROUTES-------------------------------------------------------------------------------


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
    '1',
    req.body.AmtAvail,
    req.body.LotNum,
    req.body.ExpDate)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/med`);
    })
});

// EDIT MED INFO
app.get('/:medid/med', (req, res) =>{
    ShotTracker.getMedicineByMedId(1)
        .then((data) =>{
            console.log(data);
            res.render('med-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.post('/:medid/med', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setMedById(
        req.params.medid, 
        req.body.MedName,   
        req.body.AmtAvail, 
        req.body.LotNum, 
        req.body.ExpDate)
    .then((data) => {
        console.log(data);
        res.redirect(`/med`);
    })
    .catch((error) =>{
        console.log(error);
    })
});

// SHOT ROUTES-------------------------------------------------------------------------------


// LIST ALL SHOT RECORDS
app.get('/record', (req, res) => {
    ShotTracker.getMedShot(1)
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
    '1',
    req.body.ShotTime,
    req.body.ShotLocation,
    req.body.Notes)
    .then((data) => {
        // console.log(data);
        // res.send(data);
        res.redirect(`/record`);
    })
});

// EDIT SHOT RECORDS
app.get('/:shotid/record', (req, res) =>{
    ShotTracker.getMedicineByMedId(1)
        .then((data) =>{
            console.log(data);
            res.render('med-edit-page', data);
            // res.send(data);
        })
        .catch((error) => {
            console.log(error);
        })
});
console.log('WHAT UP')
app.post('/:shotid/record', (req, res) =>{
    console.log('INFO SHOULD CHANGE BELOW');
    console.log(req.body)
    ShotTracker.setMedById(
        req.params.medid, 
        req.body.MedName,   
        req.body.AmtAvail, 
        req.body.LotNum, 
        req.body.ExpDate)
    .then((data) => {
        console.log(data);
        res.redirect(`/med`);
    })
    .catch((error) =>{
        console.log(error);
    })
});


// LISTEN FOR LOCALHOST SERVER

app.listen(3000, () => {
    console.log('Your server is running!');
});