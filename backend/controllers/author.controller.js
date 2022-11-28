const Author = require('../models/author.model');

exports.loginAuthor = async (req, res)=> {
    try {
        const authorEmail = req.user.emails[0].value;
        console.log('authorEmail????: ', authorEmail);
        localStorage.setItem('currenUserEmail', authorEmail)

        const sessionKey = req.sessionID;
        localStorage.setItem('sessionKey', sessionKey);
        console.log('sessionKey', sessionKey);

        const loggedAuthor = await Author.find(author=> author.email === authorEmail);
        if (loggedAuthor) {
            loggedAuthor.isLogged = true;
            loggedAuthor.session = sessionKey;
            await loggedAuthor.save();
        } else res.status(400).json({message: 'Not found'})
    } catch (err) {
        res.status(500).json({message: err})
    }

}