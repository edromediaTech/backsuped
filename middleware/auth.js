const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       const departement = decodedToken.departement;
       const annee = decodedToken.annee;
       const email = decodedToken.email;
       req.auth = {
           userId: userId,
           annee:annee,
           email:email,
           departement:departement
       };
	next();
   }catch(error) {
       res.status(401).json({ error });
   }
};