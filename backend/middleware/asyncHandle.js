const asyncHandler = (fn) => (res, req, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
