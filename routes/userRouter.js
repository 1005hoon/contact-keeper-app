const router = require('express').Router();

// @route   POST api/v/users
// @desc    사용자 회원가입
// @access  Public
router.post('/', (req, res) => {
  res.send('회원가입');
});

module.exports = router;
