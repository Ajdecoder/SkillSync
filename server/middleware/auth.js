import jwt from "jsonwebtoken";


const verifyUser = (req, res, next) => {
    const token = 
    req.cookies?.jwttoken ||
    req.headers["authorization"]?.replace("Bearer ", ""); 
    console.log('Token from request:', token.slice(0,10)+'...'); 
  if (!token) { 
    return res.status(401).json({
      message: "authorization denied",
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoder user:",decoded)
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Invalid token, authorization denied", error: error.message,
      });
    }
  }
};

export default verifyUser;
