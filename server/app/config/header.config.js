export const headerConfig = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,Content-Type,Allow,Access-Control-Allow-Origin'
  );
  next();
};
