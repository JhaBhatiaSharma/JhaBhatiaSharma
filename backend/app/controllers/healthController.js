const getHealthStatus = (req, res) => {
  res.status(200).json({
    statusCode: '200',
    message: 'Server is up and running',
  });
};

module.exports = { getHealthStatus };
