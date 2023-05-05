const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    // se genera la firma
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      // en las llaves van las opciones
      {
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
      // resolver la funcion con otra funcion, callback
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        // si no hay error, entonces da el token
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
