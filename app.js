const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const bodyParser = require('body-parser')


const logger = require('./utils/logger');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express(); 
const con = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@cluster0.4syq9jj.mongodb.net/suped';

//const con ='mongodb+srv://sironel:Phigando1@cluster0.4syq9jj.mongodb.net/suped';
//const con ='mongodb://localhost:27017/CEEdb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//const con ='mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@cluster0.4syq9jj.mongodb.net/?retryWrites=true&w=majority';
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
const {role} = require('./role');

const path = require('path');



app.use(cors({
  origin: ['http://localhost:3000','http://192.168.1.116:3000', 'https://ddene.onrender.com'],
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
//app.use(session({secret: "Shh, its a secret!"}));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/devoirs', express.static(path.join(__dirname, 'devoirs')));
// app.use('/actualites', express.static(path.join(__dirname, 'actualites')));


//Recuperation des routes

const departementRoutes = require('./routes/departement');
const userRoutes = require('./routes/user');
const anneeRoutes = require('./routes/annee');
const zoneRoutes = require('./routes/zone');
const ecoleRoutes = require('./routes/ecole');
const districtRoutes = require('./routes/district');
const directeurEcRoutes = require('./routes/directeurEc');
const communeRoutes = require('./routes/commune');
const sectionCommunaleRoutes = require('./routes/sectionCommunale');
const categorieRoutes = require('./routes/categorie');
const vacationRoutes = require('./routes/vacation');
const groupeFormRoutes = require('./routes/groupeForm');
const formRoutes = require('./routes/form');
const niveauenseignementRoutes = require('./routes/niveauenseignement');
const questionnaireRoutes = require('./routes/questionnaire');
const optionQuestionRoutes = require('./routes/optionQuestion');
const niveauRoutes = require('./routes/niveau');
const classeRoutes = require('./routes/classe');
const classeMatiereRoutes = require('./routes/classeMatiere');
const matiereRoutes = require('./routes/matiere');
const responsableRoutes = require('./routes/responsable');
const enseignantRoutes = require('./routes/enseignant');
const ecoleEnseignantRoutes = require('./routes/ecoleEnseignant');
const affectationRoutes = require('./routes/affectation');
const salleRoutes = require('./routes/salle');
const classeEcoleRoutes = require('./routes/classeEcole');


mongoose.set("strictQuery", false);
//connexion a  la base de donnees
mongoose.connect(con,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !--'+error.message));

  

app.use(express.json());

//Middleware to manage cross over
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//base des routes

app.use('/api/auth', userRoutes);
app.use('/api/annee', anneeRoutes);
app.use('/api/zone', zoneRoutes);
app.use('/api/ecole', ecoleRoutes);
app.use('/api/departement', departementRoutes);
app.use('/api/district', districtRoutes);
app.use('/api/commune', communeRoutes);
app.use('/api/categorie', categorieRoutes);
app.use('/api/vacation', vacationRoutes);
app.use('/api/directeurEc', directeurEcRoutes);
app.use('/api/groupeForm', groupeFormRoutes);
app.use('/api/form', formRoutes);
app.use('/api/sectionCommunale', sectionCommunaleRoutes);
app.use('/api/niveauenseignement', niveauenseignementRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/optionQuestion', optionQuestionRoutes);
app.use('/api/classe', classeRoutes);
app.use('/api/classeMatiere', classeMatiereRoutes);
app.use('/api/matiere', matiereRoutes);
app.use('/api/niveau', niveauRoutes);
app.use('/api/responsable', responsableRoutes);
app.use('/api/enseignant', enseignantRoutes);
app.use('/api/ecoleEnseignant', ecoleEnseignantRoutes);
app.use('/api/affectation', affectationRoutes);
app.use('/api/salle', salleRoutes);
app.use('/api/classeEcole', classeEcoleRoutes);


app.get('/',(req,res,next)=>{
  //res.sendFile('html/welcome.html');
  res.sendFile(path.join(__dirname+'/html/welcome.html'));
  logger.info("Server Sent A file!");
  //res.end('<h1>server started...</h1>');
});

module.exports = app;