  import bcrypt from 'bcrypt'
  const hashPassword = async (plainTextPassword) => {
      try {
        const hash = await bcrypt.hash(plainTextPassword,10);
        return hash;
      } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
      }
    };
    
  export default hashPassword;
