const privacySettings= require('../models/privacySettings');

async function changeSettings(req, res) {
    console.log(req.body)

    if (req.cookies.username !== req.params.username) {
        res.status(403)
    } else {
        const settings = await privacySettings.getSettings(req.params.username)
        settings.whoCanViewProfile = req.body.whoCanViewProfile;
        settings.whoCanLikePosts = req.body.whoCanLikePosts;
        settings.whoCanCommentOnPosts = req.body.whoCanCommentOnPosts;
        await settings.save()

        console.log(settings)
        res.status(200).json({settings: 'changed'})
    }
    
}

module.exports = {
    changeSettings
}