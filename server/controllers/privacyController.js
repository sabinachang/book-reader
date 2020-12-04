const privacySettings = require('../models/privacySettings');

const changeSettings = async (req, res) => {
    if (req.cookies.username !== req.params.username) {
        res.status(403)
    } else {
        const settings = await privacySettings.getSettings(req.params.username)
        settings.whoCanViewProfile = req.body.whoCanViewProfile;
        settings.whoCanLikePosts = req.body.whoCanLikePosts;
        settings.whoCanCommentOnPosts = req.body.whoCanCommentOnPosts;
        await settings.save()

        console.log(settings)
        res.status(200).json({ settings: 'changed' })
    }
}

const getSettingsForPrivacyType = async (req, res) => {
    if (req.cookies.username !== req.params.username) {
        res.status(403)
    } else {
        const settings = await privacySettings.getSettings(req.params.username)
        const privacyType = req.params.privacyType
        res.status(200).json({ privacyType: settings[privacyType] })
    }
}

module.exports = {
    changeSettings,
    getSettingsForPrivacyType
}