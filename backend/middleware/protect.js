import jwt from 'jsonwebtoken'


export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("No token provided");
    error.status = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Invalid token");
    error.status = 401;
    return next(error);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SEC_KEY);
  } catch (err) {
    const error = new Error("Invalid token");
    error.status = 401;
    return next(error);
  }

  req.user = decoded;
  next();
};
