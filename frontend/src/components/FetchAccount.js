const FetchAccount = async () => {
  var bp = require('./Path.js');
  var email = localStorage.getItem('userEmail');

  var obj = { email: email };
  var js = JSON.stringify(obj);

  try {
      const response = await fetch(bp.buildPath('api/fetchaccount'), {
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

module.exports = FetchAccount;
