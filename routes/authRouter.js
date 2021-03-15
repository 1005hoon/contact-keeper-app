const router = require('express').Router();

// @route   GET api/v/auth
// @desc    로그인 된 회원 정보 가져오기
// @access  Private
router.get('/', (req, res) => {
  res.send('로그인 유저 정보 가저오기');
});

// @route   POST api/v/auth
// @desc    회원 로그인 및 토큰 생성하기
// @access  Public
router.post('/', (req, res) => {
  res.send('유저 로그인');
});

module.exports = router;
