const handleGoogleRedirect = async (req, res) => {
  const { code } = req.query;
  console.log(`code`, code);
};

module.exports = { handleGoogleRedirect };
