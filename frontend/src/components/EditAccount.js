const EditAccount = async (userId, username, email, password) => {
    var bp = require('./Path.js');
    var obj = { userId, username, email, password };
    var js = JSON.stringify(obj);
  
    try {
        const response = await fetch(bp.buildPath('api/editaccount'), {
            method: 'POST',
            body: js,
            headers: { 'Content-Type': 'application/json' }
        });
  
        var res = JSON.parse(await response.text());
  
        if (!res.error) {
            return res; 
        } else {
            throw new Error(res.error); 
        }
    } catch (e) {
        throw new Error(e.toString()); 
    }
  };
  
  module.exports = EditAccount;
 