const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   POST api/v/users
// @desc    사용자 회원가입
// @access  Public
router.post(
  '/',
  [
    check('name', '이름을 입력해주세요').not().isEmpty(),
    check('email', '이메일 주소를 확인해주세요').isEmail(),
    check('password', '비밀번호는 6자 이상이여야 합니다').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: '이미 존재하는 사용자입니다' });
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      // await user.save();

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
