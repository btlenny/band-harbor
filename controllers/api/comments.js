const Comment = require('../../models/band');

module.exports = {
    addNewComment,
    getAllComments,
    getOneComment,
    deleteOneComment,
    updateOneComment
};

async function addNewComment(req, res) {
    try {
        const comment = await Comment.create(req.body);
        res.json(comment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}

async function getAllComments(req, res) {
  try {
      const comments = await Comment.find({});
      res.json(comments);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getOneComment(req, res) {
  try {
      const comment = await Comment.findById(req.params.id);
      res.json(comment);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteOneComment(req, res) {
  try {
      const deletedComment = await Comment.findByIdAndRemove(req.params.id);
      res.json(deletedComment);
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateOneComment(req, res) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // This option returns the modified document rather than the original
      );
  
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.json(updatedComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }