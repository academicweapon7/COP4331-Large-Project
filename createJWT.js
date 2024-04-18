const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.createToken = function(login)
{
    return _createToken(login)
}

_createToken = function(login)
{
    try
    {
        const expiration = new Date()
        const user = {login:login}
        const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET)
        var ret = {accessToken:accessToken}
    }
    catch(e)
    {
        var ret = {error:e.message}
    }
    return ret
}

exports.isExpired = function(token)
{
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) =>
    {
        if (err)
            return true
        else
            return false
    })

    return isError
}

exports.refresh = function(token)
{
    var ud = jwt.decode(token, {complete:true})
    var login = ud.payload.login;

    return _createToken(login)
}