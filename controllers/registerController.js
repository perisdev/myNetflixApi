const fs = require('fs');
const { generateId } = require('../tools');

const registerController = (req, res) => {
  const user = req.body;
  const db = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));


  const longitudPattern = /.{8,}/

  if (!longitudPattern.test(user.password)) {
     return res
       .status(400)
       .json({ message: `password too short` });
  }

   const digitCharacters = /\d/;

   if (!digitCharacters.test(user.password)) {
     return res
       .status(400)
       .json({ message: `password must have a digit` });
   }
    const capitalCharacters = /[A-Z]/;

    if (!capitalCharacters.test(user.password)) {
      return res
        .status(400)
        .json({ message: `password must have a capitalCase` });
    }
     const expecialCharacters = /[!|@#$%¬/()\[\]\+\*\{\}]/;

     if (!expecialCharacters.test(user.password)) {
       return res
         .status(400)
         .json({ message: `password must have a special character` });
     }

  const userExists = db.users.some(
    existentUser => existentUser.email === user.email,
  );

  if (userExists) {
    return res
      .status(400)
      .json({ message: `email ${user.email}  already exists` });
  }

  user.id = generateId();
  db.users.push(user);

  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));

  res.status(200).json(user);
};


module.exports = registerController;