const User = require('../models/user');
const Annee = require('../models/annee');
const Departement = require('../models/departement');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const { find } = require('../models/user');
const { verifyUserLevel } = require('../role.js');


exports.signup = async (req, res, next) => {
 
  const url = req.headers.origin  
  const dept = await Departement.findOne({url:url})
  
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        name: req.body.name,
        departement:dept,
        user_level:req.body.user_level,
        //checkInsc:false,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => {
      
      res.status(201).json(user)       
      
    })
      
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


exports.login = async (req, res, next) => {
  
  try {
      const url = req.headers.origin;
      const dept = await Departement.findOne({ url: url });
      
      const annee = await Annee.find();
      let pg_year = 0;
      let lastyear = '';
      for (const y of annee) {
          const an = parseInt(y.nom.split('-')[1]);
          if (pg_year < an) {
              pg_year = an;
              lastyear = y.nom;
          }
      }
      
      const user = await User.findOne({ email: req.body.email, departement: dept });
      if (!user) {
          return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }
      //io.emit('userConnected', user);
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
          return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }

      res.cookie('departement_id', user.departement);
     
      // verifie le niveau de l´utilisateur
      const testUserLevel = await verifyUserLevel(user.userLevel, user._id);
      
      await User.updateOne({ _id: user._id }, { lastSeen: new Date() });
     
      res.status(200).json({
          userId: user._id,
          name: user.name,
          email: user.email,
          user_level: user.userLevel,
          testUserLevel: testUserLevel,
          departement: user.departement,
          anac: lastyear,
          token: jwt.sign(
              { userId: user._id, userLevel: user.userLevel, departement: user.departement, annee: lastyear },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
          )
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id
  }).then(
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

 //  /api/auth/logout
 exports.logout = (req, res, next) => {
  
  
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          logger.error(`405 || ${err} `);
          res.status(400).json({message:'Unable to log out'})
        } else {
          logger.info(`205 || Logout successful  `);
          res.json({message:'Logout successful'})
        }
      });
    } else {
      res.end()
    }
  };


exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
  
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const url =   req.headers.origin
    const dept = await Departement.findOne({url:url})
    try {
        const users = await User.find({departement:dept._id,email: { $nin: ["sironel2002@gmail.com","da@gmail.com"] },
        _id:{ $nin: [req.auth.userId] }});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserLevel = async (req, res) => {
 
  const { _id, userLevel } = req.body;
 
  try {
    const user = await User.findByIdAndUpdate(_id, { userLevel: userLevel }, { new: true });
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
