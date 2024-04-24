require('express');
require('mongodb');
const nodemailer = require('nodemailer');

exports.setApp = function ( app, client )
{
  app.post('/api/register', async (req, res, next) =>
  {
    // incoming: email, login, password
    // outgoing: verif_code, error


    function generateVerificationCode() {
      return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
    }

    async function sendVerificationEmail(email, verificationCode) {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'ldubuget@gmail.com',
              pass: 'brdg pbwq bnil qwct'
          }
      });
  
      let mailOptions = {
          from: 'ldubuget@gmail.com',
          to: email,
          subject: 'Verification Code for Your Account',
          text: `Your verification code is: ${verificationCode}`
      };
  
      try {
          let info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);
      } catch (error) {
          console.log('Error sending email:', error);
      }
  }

    const { email, login, password } = req.body;

    const db = client.db("Database");

    const emails = await db.collection('Users').find({email:email}).toArray();
    const logins = await db.collection('Users').find({login:login}).toArray();

    if( emails.length > 0)
    {
      ret = {error:"Email already in use."};
    }
    else if( logins.length > 0 )
    {
      ret = {error:"Login already in use."};
    }
    else 
    {
      const verifCode = generateVerificationCode();

      const newUser = {
        email: email,
        login: login,
        password: password,
        highscore: 0,
        rounds_played: 0,
        rounds_won: 0,
        streak: 0,
        verified: false,
        verif_code: verifCode,
        hsdate: new Date()};
      var error = '';

      try
      {
        //const db = client.db("Database");
        const result = db.collection('Users').insertOne(newUser);
        sendVerificationEmail(email, verifCode);
      }
      catch(e)
      {
        error = e.toString();
      }

      var ret = { verif_code:verifCode, error: error };
    }
    
    res.status(200).json(ret);

  });

  app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, login, highscore, rounds_played, rounds_won, streak, verified, verif_code, error

    const { login, password } = req.body;

    const db = client.db("Database");
    const results = await db.collection('Users').find({ login: login, password: password }).toArray();

    var ret;
    if (results.length > 0) {
        const { _id, email, login, highscore, rounds_played, rounds_won, streak, verified, verif_code } = results[0]; // Destructure user data
        ret = { id: _id, email, login, highscore, rounds_played, rounds_won, streak, verified, verif_code, error: '' };

    } else {
        ret = { error: "Login/Password incorrect" };
    }

    res.status(200).json(ret);
  });

  app.post('/api/forgotpassword', async (req, res, next) =>
  {
    // incoming: email
    // outgoing: error

    function generateTempPassword() {
      const length = 10;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
      let password = "";
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
      }
      return password;
    }

    async function sendForgotPasswordEmail(email, tempPassword) {
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'ldubuget@gmail.com',
              pass: 'brdg pbwq bnil qwct'
          }
      });
  
      let mailOptions = {
          from: 'ldubuget@gmail.com',
          to: email,
          subject: 'Forgot Password',
          text: `Your temporary password is: ${tempPassword}`
      };
  
      try {
          let info = await transporter.sendMail(mailOptions);
          console.log('Email sent:', info.response);
      } catch (error) {
          console.log('Error sending email:', error);
      }
    }

    const { email } = req.body;

    const db = client.db("Database");

    try {
        const user = await db.collection('Users').findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }

        const tempPassword = generateTempPassword();

        try {
            await db.collection("Users").updateOne(
                { email: email },
                { $set: { password: tempPassword } }
            );
            sendForgotPasswordEmail(email, tempPassword);
            return res.status(200).json({ message: "Email sent" });
        } catch (updateError) {
            return res.status(500).json({ error: updateError.toString() });
        }
    } catch (findError) {
        return res.status(500).json({ error: findError.toString() });
    }
  });

  app.post('/api/verifyaccount', async(req, res, next) =>
  {
    //incoming: email, verif_code
    //outgoing: verif_success, error

    const { email, verif_code } = req.body;

    //const {ObjectId} = require('mongodb');
    //var o_id = new ObjectId(id);

    const db = client.db("Database");
    const results = await db.collection('Users').find({email:email}).toArray();
  
    var verif_success = false;
    var error = '';

    if( results.length > 0 ) 
    {
      if( results[0].verified == true) 
      {
        error = "User already verified.";
      }
      else
      {
        if (verif_code == results[0].verif_code) 
        {
          try {
            await db.collection("Users").updateOne(
              { email:email },
              { $set: { verified:true } }
            );
          } 
          catch (e) 
          {
            error = e.toString();
          }
          verif_success = true;
        }
        else 
        {
          error = "Verification code does not match.";
        }
      }
    }
    else 
    {
      error = "User not found.";
    }

    var ret = { verif_success:verif_success, error:error };
    res.status(200).json(ret);
  });

  app.post('/api/fetchaccount', async (req, res, next) => {
    // incoming: email
    // outgoing: id, email, login, password, highscore, rounds_played, rounds_won, streak, verified, verif_code, error

    const { email } = req.body;
    const db = client.db("Database");
    let ret = {}; // Declare ret variable
    let error = '';

    try {
        if (email !== undefined && email !== '') {
            const results = await db.collection('Users').find({ email: email }).toArray();

            if (results && results.length > 0) {
                const {
                    _id,
                    email: userEmail,
                    login,
                    password,
                    highscore,
                    rounds_played,
                    rounds_won,
                    streak,
                    verified,
                    verif_code
                } = results[0];
                ret = {
                    id: _id,
                    email: userEmail,
                    login,
                    password,
                    highscore,
                    rounds_played,
                    rounds_won,
                    streak,
                    verified,
                    verif_code,
                    error: ''
                };
            } else {
                error = 'Account not found.';
            }
        } else {
            error = 'Please provide email.';
        }
    } catch (err) {
        error = 'Internal server error.';
        console.error(err); // Log the error for debugging purposes
    }

    if (error) {
        ret = { error }; // Ensure consistent error response format
    }

    res.status(200).json(ret);
  });

  app.post('/api/editaccount', async (req, res, next) => {
    const { userId, username, password } = req.body;

    const { ObjectId } = require('mongodb');
    const o_id = new ObjectId(userId);

    const db = client.db("Database");

    try {
        const existingUser = await db.collection('Users').findOne({ _id: o_id });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const existingUsername = await db.collection('Users').findOne({ login: username });

        if (existingUsername && existingUsername._id.toString() !== userId) {
            return res.status(400).json({ error: "Username already in use" });
        }

        await db.collection("Users").updateOne(
            { _id: o_id },
            { $set: { login: username, password: password } }
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
  });

  app.post('/api/regenverif', async (req, res, next) => {
    //incoming: email
    //outgoing: new_code, error

    const { email } = req.body;

    const db = client.db("Database");
    const results = await db.collection('Users').find({email:email}).toArray();
    
    var error = '';
    const randomNumber = Math.floor(Math.random() * 100000);

    if( results.length > 0 ) 
    {
      try {
        await db.collection("Users").updateOne(
          { email:email },
          { $set: { verif_code:randomNumber } }
        );
      } 
      catch (e) 
      {
        error = e.toString();
      }    
    }
    else 
    {
      error = "User not found.";
    }

    var ret = { new_code:randomNumber, error:error };
    res.status(200).json(ret);
  });

  app.post('/api/deleteaccount', async(req, res, next) =>
  {
    //incoming: id
    //outgoing: error

    const { id } = req.body;

    const {ObjectId} = require('mongodb');
    var o_id = new ObjectId(id);

    const db = client.db("Database");
    const results = await db.collection('Users').find({_id:o_id}).toArray();

    var error = '';

    if( results.length > 0 ) 
    {
      try {
        db.collection("Users").deleteOne({_id:o_id});
      }
      catch (e) 
      {
        error = e.toString();
      }
    }
    else 
    {
      error = "User not found.";
    }

    var ret = { error:error };
    res.status(200).json(ret);
  });

  app.post('/api/changepassword', async (req, res, next) => {
    //incoming: email, new_password
    //outgoing: error

    const { email, new_password } = req.body;

    const db = client.db("Database");
    const results = await db.collection('Users').find({email:email}).toArray();
  
    var error = '';

    if( results.length > 0 ) 
    {
      try {
        await db.collection("Users").updateOne(
          { email:email },
          { $set: { password:new_password } }
        );
      } 
      catch (e) 
      {
        error = e.toString();
      }    
    }
    else 
    {
      error = "User not found.";
    }

    var ret = { error:error };
    res.status(200).json(ret);
  });
  
  app.post('/api/getgame', async (req, res, next) =>
  {
    // incoming: 
    // outgoing: id, title, peakPlayerCount, imageURL, error

    var error = '';

    //const { count } = req.body;

    const db = client.db("Database");
    const results = await db.collection('Games').aggregate([{ $sample: { size: 1 } }]).toArray();

    var id = -1;
    var title = '';
    var peakPlayerCount = -1;
    var image_url = '';

    if( results.length > 0)
    {
      id = results[0]._id;
      title = results[0].title;
      peakPlayerCount = results[0].peakPlayerCount;
      image_url = results[0].image_url;
    }
    else 
    {
      error = "Could not retrieve game";
    }
    
    ret = { id:id, title:title, peakPlayerCount:peakPlayerCount, image_url:image_url, error:error};
    res.status(200).json(ret);
  });


  app.post('/api/gameover', async (req, res, next) =>
  {
    // incoming: login, score
    // outgoing: highscore, rounds_played, rounds_won, error

    const { login, score } = req.body;

    
    //const {ObjectId} = require('mongodb');
    //var o_id = new ObjectId(id);

    const db = client.db("Database");
    const results = await db.collection('Users').find({login:login}).toArray();

    var ret;
    var highscore = -1;
    var rounds_played = -1;
    var rounds_won = -1;
    var error = '';

    if( results.length > 0) 
    {
      if(score > results[0].highscore)
      {
        highscore = score;
      }
      else
      {
        highscore = results[0].highscore;
      }
      rounds_played = results[0].rounds_played + score + 1;
      rounds_won = results[0].rounds_won + score;
      
      try {
        await db.collection("Users").updateOne(
          { login:login },
          { $set: { highscore:highscore, rounds_played:rounds_played, rounds_won:rounds_won } }
        );
      } 
      catch (e) 
      {
        error = e.toString();
      }
    }
    else 
    {
      error = "User not found.";
    }
    
    ret = { highscore:highscore, rounds_played:rounds_played, rounds_won:rounds_won, error:error};
    res.status(200).json(ret);
  });


  app.post('/api/getleaderboard', async (req, res, next) =>
  {
    // incoming: top, bottom
    // outgoing: results, error

    var _ret = [];
    var error = '';

    const { top, bottom } = req.body

    if (top <= 0 || top > bottom)
    {
      error = "improper leaderboard parameters";
    }
    else{
      const db = client.db("Database");
      const results = await db.collection('Users').find().sort({highscore: -1, hsdate: 1}).skip(top-1).limit(bottom-top+1).toArray();

      if (results.length <= 0) 
      {
        error = "empty leaderboard"
      }
      else{
        for( var i = 0; i < results.length; i++ )
        {
          _ret.push( results[i] );
        }
      }
    }

    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
  });


  app.post('/api/searchcards', async (req, res, next) => 
  {
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';

    const { userId, search } = req.body;

    var _search = search.trim();
    
    const db = client.db("COP4331Cards");
    const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i].Card );
    }
    
    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
  });
}