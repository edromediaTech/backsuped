const Personnel = require('./models/personnel');
const role = {
    "utilisateur":0,
    "eleve":1,
    "professeur":2,
    "directeur":3,
    "responsable":4,
    "operateur":5,
    "inspecteurZ":6,
    "inspecteurP":7,
    "inspecteurG":8,
    "comptableA":9,
    "comptable":10,
    "administrateurC":11,
    "directeurA":12,    
    "directeurD":13,       
    "admin":14,
    "supAdmin":15
 }

 async function checkIfPersonnelExists(id) {
    const exists = await Personnel.exists({ user_id: id });
    return exists;
  }
 
 async function verifyUserLevel(level, user){

    let privilege = false
    switch (level) {
      case role.utilisateur:
        privilege = true
        break;
      case role.operateur:
        privilege = true
        break;
      case role.admin:
        privilege = true
        break;
      default:
        privilege = (await checkIfPersonnelExists(user) ? true : false)        
    }

    return privilege
    
 }

module.exports ={role, verifyUserLevel}; 