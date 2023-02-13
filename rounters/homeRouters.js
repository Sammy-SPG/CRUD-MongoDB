const { Router } = require('express');
const { con, client } = require('../helpers/conection');
const router = Router();

router.get('/', async (req, res) => {
    res.render('index');
});


router.post('/setUser', async (req, res) => {
    try {
        const database = await con();
        if (database) {
            const CollectionUser = database.collection('users');
            const doc = { name: req.body.name, shape: "round" };
            const result = await CollectionUser.insertOne(doc);
            res.json(result);
        } else {
            res.json({ error: 'Error creating collection' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/getUser', async (req, res) => {
    try {
        const database = await con();
        if (database) {
            const CollectionUser = database.collection('users');
            const result = CollectionUser.find();
            if ((await CollectionUser.countDocuments()) === 0) res.json({ message: 'No users found' });
            const arrayUsers = [];
            await result.forEach((user) => {
                arrayUsers.push(user);
            });
            res.json(arrayUsers);
        } else {
            res.json({ error: 'Error creating collection' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/delteUser', async (req, res) => {
    try {
        const database = await con();
        if (database) {
            const CollectionUser = database.collection('users');
            const result = await CollectionUser.deleteOne({ name: req.body.name });
            if (result.deletedCount === 1) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.json({ message: 'No documents matching the criteria' });
            }
        } else {
            res.json({ error: 'Error creating collection' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/updateUser', async (req, res) => {
    try {
        const database = await con();
        if (database) {
            const CollectionUser = database.collection('users');
            const result = await CollectionUser.updateOne({ name: req.body.name }, { $set: { shape: 'Cute <3' }, $currentDate: { lastModified: true } });
            if (result.modifiedCount === 0) {
                res.json({ message: 'No changes were made' });
            } else {
                res.json({ message: 'Changes were made' });
            }
        } else {
            res.json({ error: 'Error creating collection' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;