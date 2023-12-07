const express = require('express');
const router = express.Router();
const ensureLoggedIn = require("../../config/ensureLoggedIn");
const commentsController = require('../../controllers/api/comments');

router.get('/:id/comments', ensureLoggedIn, commentsController.getAllComments);
router.post('/:id/comments', ensureLoggedIn, commentsController.addNewComment);
router.delete('/:id/comments/:id', ensureLoggedIn, commentsController.deleteComment);
router.put('/:id/comments/:id', ensureLoggedIn, commentsController.updateComment);



module.exports = router;