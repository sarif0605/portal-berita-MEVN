const chechkPermission = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "forbidden",
    });
  }
};
