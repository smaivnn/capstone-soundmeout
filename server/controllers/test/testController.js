const User = require("../../model/User");

const handleTest = async (req, res) => {
  const users = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
  ];
  res.json(users);
};

module.exports = { handleTest };
