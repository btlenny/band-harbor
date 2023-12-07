const Band = require('../../models/band');


module.exports = {
    addNewComment,
    getAllComments,
    deleteComment,
    updateComment
};

async function addNewComment(req, res) {
    try {
      const bandId = req.params.id;
      const band = await Band.findById(bandId);
  
      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }
      const commentText = req.body;
      // Check if commentText is undefined or not provided
      if (!commentText) {
        return res.status(400).json({ error: 'Comment text is required' });
      }
      // Create a new comment object with the text
      band.comments.push(commentText);
      await band.save();
  
      res.json(band.comments); // Send back the created comment
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async function getAllComments(req, res) {
    try {
        const bandId = req.params.id;
        const band = await Band.findById(bandId);

        if (!band) {
            return res.status(404).json({ error: 'Band not found' });
        }

        const comments = band.comments;
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteComment(req, res) {
    try {
        const bandId = req.params.id;
        const band = await Band.findById(bandId);

        if (!band) {
            return res.status(404).json({ error: 'Band not found' });
        }

        const commentId = req.params.commentId;
        band.comments.id(commentId).remove();

        await band.save();

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateComment(req, res) {
    try {
      const bandId = req.params.id;
      const band = await Band.findById(bandId);
  
      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }
  
      const newText = req.body.text;
      const commentText = req.params.commentText;
  
      if (!newText) {
        return res.status(400).json({ error: 'New text is required for the update' });
      }
  
      // Find the comment based on its text
      const comment = band.comments.find(comment => comment.text === commentText);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Update the comment text
      comment.text = newText;
  
      await band.save();
  
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }