const router = require('express').Router();
const { User } = require('../../models');

// create new user and sets session data
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.userName = userData.userName;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch(err) {
        res.status(400).json(err);
    }
});

// process login 
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                user_name: req.body.userName
            },
        });

        if (!userData) {
            res.status(400).json({message: 'Incorrect user name or password - please try again!'})
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({message: 'Incorrect user name or password - please try again!'})
            return;            
        }

        console.log('Save session data');
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.userName = userData.userName;
            req.session.logged_in = true;
            
            res.status(200).json({
                userData,
                message: 'You are logged in!',
            });
        });
    } catch(err) {
        res.status(400).json(err);
    }

});

// logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() =>{
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
