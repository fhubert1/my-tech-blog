const router = require('express').Router();
const { Post } = require('../../models/');
const { apiAuth } = require('../../utils/apiAuth');

// post create comment
router.post('/', apiAuth, async (req, res) => {
    const body = req.body;

    try {
        const newPost = await Post.create({
            ...body,
            userId: req.session.user_id
        });
        res.json(newPost);

    } catch(err) {
        res.status(500).json(err);
    }
});

// put new comment
router.put('/:id', apiAuth, async(req, res) => {
    try {
        const [updatedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updatedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

// delete comment by id
router.delete('/:id', apiAuth, async(req, res) => {
    try {
        const [deletedRows] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (deletedRows > 0) {
            res.status(200).end();
        } else {
            res.status(400).end();
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;

