import jwt from 'jsonwebtoken';
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) {
    return res.status(401).json({
        StatusCode:401,
        message:"unauthorized"
    }); 
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        StatusCode:403,
        message:"Forbidden"
      }); 
    }
    req.user = user;
    next(); 
  });
};
export default authenticateToken;
