import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
const hashPassword = async (plainTextPassword) => {
  try {
    const hash = await bcrypt.hash(plainTextPassword, 10);
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};
const generateToken = async(public_key,email)=>{
  const token = await jwt.sign(
    { public_key: public_key, email:email},
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
  if(token){
    return token
  }else{
    return "No token generated";
  }
}

export { hashPassword,generateToken};

