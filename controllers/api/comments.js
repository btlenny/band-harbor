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
        const commentId = req.params.id;
        const band = await Band.findOne({ 'comments._id': commentId });

        if (!band) {
            return res.status(404).json({ error: 'Band not found' });
        }

        const comment = band.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment from the array
        comment.remove();

        // Save the updated band
        await band.save();

        // Return a success response or the deleted comment
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function updateComment(req, res) {
    try {
      const commentId = req.params.id;
      console.log(commentId)
      const band = await Band.findOne({ 'comments._id': commentId });
      const comment = band.comments.id(commentId);
  
  
      const newText = req.body.text;
  
      if (!newText) {
        return res.status(400).json({ error: 'New text is required for the update' });
      }
  
      comment.comment = newText;
  
      await band.save();
    
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }