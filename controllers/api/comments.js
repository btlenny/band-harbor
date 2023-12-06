const Band = require('../../models/band');


module.exports = {
    addNewComment,
    getAllComments,
    deleteOneComment,
    updateOneComment
};

async function addNewComment(req, res) {
    try {
      const bandId = req.params.id;
      const band = await Band.findById(bandId);
      
      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }

      console.log('Received data:', req.body);

  
      const commentData = req.body.comments;
      console.log('Received data:', commentData);
  
      band.comments.push(commentData);
      await band.save();
  
      res.json(commentData);
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

async function deleteOneComment(req, res) {
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

async function updateOneComment(req, res) {
    try {
        const bandId = req.params.id;
        const band = await Band.findById(bandId);

        if (!band) {
            return res.status(404).json({ error: 'Band not found' });
        }

        const commentId = req.params.commentId;
        const comment = band.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        comment.set(req.body);
        await band.save();

        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}