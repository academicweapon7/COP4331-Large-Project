require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
  app.post('/api/addcard', async (req, res, next) =>
  {
    // incoming: userId, color
    // outgoing: error
    
    const { userId, card } = req.body;

    const newCard = {Card:card,UserId:userId};
    var error = '';

    try
    {
      const db = client.db("COP4331Cards");
      const result = db.collection('Cards').insertOne(newCard);
    }
    catch(e)
    {
      error = e.toString();
    }

    cardList.push( card );

    var ret = { error: error };
    res.status(200).json(ret);
  });


  app.post('/api/register', async (req, res, next) =>
  {
    // incoming: email, login, password
    // outgoing: error

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
      const newUser = {email:email,login:login,password:password,highscore:0,rounds_played:0,rounds_won:0,streak:0,verified:false};
      var error = '';

      try
      {
        //const db = client.db("Database");
        const result = db.collection('Users').insertOne(newUser);
      }
      catch(e)
      {
        error = e.toString();
      }

      var ret = { error: error };
    }

    
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


  app.post('/api/verifyaccount', async(req, res, next) =>
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
      if( results[0].verified == true) 
      {
        error = "User already verified.";
      }
      else
      {
        try {
            await db.collection("Users").updateOne(
              { _id:o_id },
              { $set: { verified:true } }
            );
          } 
          catch (e) 
          {
            error = e.toString();
          }
      }
    }
    else 
    {
      error = "User not found.";
    }

    var ret = { error:error };
    res.status(200).json(ret);
  });


  app.post('/api/login', async (req, res, next) => 
  {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    
    var error = '';

    const { login, password } = req.body;

    const db = client.db("Database");
    const results = await db.collection('Users').find({login:login,password:password}).toArray();

    var id = -1;
    var username = '';
    var hs = -1;
    var rounds_played = -1;
    var rounds_won = -1;
    var streak = -1;

    var ret;

    if( results.length > 0 )
    {
      id = results[0]._id;
      username = results[0].login;
      hs = results[0].highscore;
      rounds_played = results[0].rounds_played;
      rounds_won = results[0].rounds_won;
      streak = results[0].streak;

      
    }
    else 
    {
      error = "Login/Password incorrect";
    }

    ret = { id:id, login:username, highscore:hs, rounds_played:rounds_played, rounds_won:rounds_won, streak:streak, error:error};
    res.status(200).json(ret);
  });

  app.post('/api/getgame', async (req, res, next) =>
  {
    // incoming: count
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
    // incoming: id, score
    // outgoing: highscore, rounds_played, rounds_won, error

    const { id, score } = req.body;

    
    const {ObjectId} = require('mongodb');
    var o_id = new ObjectId(id);

    const db = client.db("Database");
    const results = await db.collection('Users').find({_id:o_id}).toArray();

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
          { _id:o_id },
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