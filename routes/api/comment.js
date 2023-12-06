const express = require('express');
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const commentsController = require('../../controllers/api/comments');

router.get('/:id/comments', ensureLoggedIn, commentsController.getAllComments);
router.post('/:id/comments', ensureLoggedIn, commentsController.addNewComment);
router.delete('/:id/comments/:id', ensureLoggedIn, commentsController.deleteOneComment);
router.put('/:id/comments/:id', ensureLoggedIn, commentsController.updateOneComment);



module.exports = router;