const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/like/:comment_id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.comment_id);
    commentData.likes++;

    commentData.save();

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:comment_id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.comment_id);

    !commentData
      ? res.status(404).json({ message: 'No comment found with this id!' })
      : res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:comment_id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        ...req.body,
      },
      {
        where: {
          comment_id: req.params.comment_id,
          user_id: req.session.user_id,
        },
      }
    );
    !commentData[0]
      ? res.status(404).json({ message: 'No comment found with this id!' })
      : res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:comment_id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        comment_id: req.params.comment_id,
        user_id: req.session.user_id,
      },
    });

    !commentData
      ? res.status(404).json({ message: 'No comment found with this id!' })
      : res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;