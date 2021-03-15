const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   GET api/v/auth
// @desc    로그인 된 회원 정보 가져오기
// @access  Private
router.get('/', (req, res) => {
  res.send('로그인 유저 정보 가저오기');
});

// @route   POST api/v/auth
// @desc    회원 로그인 및 토큰 생성하기
// @access  Public
router.post(
  '/',
  [
    check('email', '이메일 주소를 확인해주세요').isEmail(),
    check('password', '비밀번호를 입력해주세요').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: '잘못된 사용자 정보입니다',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: '잘못된 사용자 정보입니다',
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 3600,
      });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
