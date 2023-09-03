const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// display all posts on the homepage through a map
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// display only posts only of a certain id when clicking on post link 
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dashboard (unfinished)
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders login page and redirects
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to their profile route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// renders signup and redirects
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;