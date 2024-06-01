import {bcrypt} from 'bcrypt'
const saltRounds = 10; 
const hashPassword = async (plainTextPassword) => {
    try {
      const hash = await bcrypt.hash(plainTextPassword, saltRounds);
      return hash;
    } catch (err) {
      console.error('Error hashing password:', err);
      throw err;
    }
  };
  
exports.default = hashPassword;
