const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  // console.log(req.headers);

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Shoo! You're not authorized. Go away." });
  }

  // the auth in the headers is structured as follows:
  // 'Bearer h8fr3y43y7834rf.y89d43y78y78934dy78f34.h89d34yh8934dh789'
  // and we only need the second part, ergo the jwt
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log(jwt.verify(token, process.env.SECRET));
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "You are not supposed to be here. Nice try though." });
  }
};

module.exports = requireAuth;
