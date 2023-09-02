const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  
    const newData = {
      body: req.body.body,
      post_id: req.body.id,
    };

  try {
    const newComment = await Comment.create(newData);

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;