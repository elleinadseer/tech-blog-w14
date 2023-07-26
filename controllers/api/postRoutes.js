const router = require('express').Router();
const { Post, Tag, PostTag } = require('../../models');
const withAuth = require('../../utils/auth');

/*
router.post("/", withAuth, async (req, res) => {
  console.log("hitting the route", req.body);

  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});
*/

router.post('/', withAuth, async (req, res) => {
  try {
    const { post_content, tag_name } = req.body; // Extract post content and selected tag from request body

    // First, create the post
    const postData = await Post.create({
      post_content,
      user_id: req.session.user_id,
    });

    // Then, associate the post with the selected tag
    if (tag_name) {
      const tag = await Tag.findOne({
        // Find the tag
        where: { tag_name: tag_name },
      });

      await PostTag.create({
        // Create a new entry in the PostTag association table
        post_id: postData.post_id, // ID of the created post
        tag_id: tag.tag_id, // ID of the selected tag
      });
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.post('/like/:post_id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.post_id);
    postData.likes++;

    postData.save();

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:post_id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.post_id);

    !postData
      ? res.status(404).json({ message: 'No post found with this id!' })
      : res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:post_id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        ...req.body,
      },
      {
        where: {
          post_id: req.params.post_id,
          user_id: req.session.user_id,
        },
      }
    );
    !postData[0]
      ? res.status(404).json({ message: 'No post found with this id!' })
      : res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:post_id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        post_id: req.params.post_id,
        user_id: req.session.user_id,
      },
    });

    !postData
      ? res.status(404).json({ message: 'No post found with this id!' })
      : res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;