const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get posts route
router.get("/", withAuth, async (req, res) => {
  console.log("hitting the route", req.body);

  try {
    const postData = await Post.findAll({
      include: [{model: Comment}]
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post route
router.put('/', withAuth, async (req, res) => {
  try {
    const newData = { 
      title: req.body.title,
      body: req.body.body
    };

    console.log(newData);

    // First, create the post
    const postData = await Post.update(newData, 
      {
      where: {
        book_id: req.params.book_id,
      }
    });
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// get post by id route
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!readerData) {
      res.status(404).json({ message: 'No post found with this id!' })
      return;
    } 
    
    res.status(500).json(err); 
  } catch (err) {
    res.status(500).json(err);
  }
});

// create post route
router.post('/', withAuth, async (req, res) => {

  const newData = { 
    title: req.body.title,
    body: req.body.body,
    id: req.session.user_id,
  };

  try {
    const newPost = await Post.create(newData);
  
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete post by id route
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
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