const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { withAuth, withoutAuth } = require('../utils/apiAuth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });
  
        const posts = postData.map((post) => post.get({ plain: true }));
  
        res.render('home', { posts, loggedIn: req.session.logged_in });
    } catch (err) {
      res.status(500).json(err);
    }
});

// get post by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User, {
                    model: Comment,
                    include: [User],
                },
            ],
        });
  
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('post', { 
                post, 
                loggedIn: req.session.logged_in 
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
      res.status(500).json(err);
    }
});

// login
router.get('/login', withoutAuth, (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  // sign up
  router.get('/signup', withoutAuth, (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
module.exports = router;