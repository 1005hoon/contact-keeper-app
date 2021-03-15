const router = require('express').Router();

// @route   GET api/v/contacts
// @desc    모든 고객 정보 가져오기
// @access  Private
router.get('/', (req, res) => {
  res.send('사람 정보 가져오기');
});

// @route   POST api/v/contacts
// @desc    새로운 고객 정보 생성하기
// @access  Private
router.post('/', (req, res) => {
  res.send('고객 정보 생성하기');
});

// @route   PUT api/v/contacts/:id
// @desc    id 고객 정보 수정하기
// @access  Private
router.put('/:id', (req, res) => {
  res.send('고객 정보 업데이트 하기');
});

// @route   DELETE api/v/contacts
// @desc    고객 정보 삭제하기
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('고객 정보 삭제하게');
});

module.exports = router;
