const User = require("../../model/User");

const handleSearchUser = async (req, res) => {
  const { keyWord } = req.params;
  if (!keyWord) {
    return res.status(400).json({
      status: 400,
      success: false,
      source: "searchUserController.js/handleSearchUser",
      type: "유저 검색 실패",
      message: "request body not enough.",
    });
  }

  try {
    const foundUser = await User.find(
      {
        $or: [
          { loginId: { $regex: keyWord, $options: "i" } },
          { name: { $regex: keyWord, $options: "i" } },
        ],
      },
      { loginId: 1, name: 1, _id: 1 }
    );
    return res.status(200).json({
      status: 200,
      success: true,
      message: "성공적인 유저 조회",
      userArray: foundUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      source: "searchUserController.js/handleSearchUser",
      type: "server error",
      message: `Internal server error`,
    });
  }
};

module.exports = { handleSearchUser };
