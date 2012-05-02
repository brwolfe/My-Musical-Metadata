////////////////////////////////////////////////////////////////////////////////

var USER_OR_GROUP_NAME = 'steampunkunicorn'; // TODO: Insert GitHub username or group name.

////////////////////////////////////////////////////////////////////////////////

if (! USER_OR_GROUP_NAME) { 
  throw new Error(
    'You must set your GitHub username or group name in the app.js file'); 
}

// Import some utility functions.
var utils = require('./utils');

// Create a new web application.
var app = utils.initializeWebApp();

// Connect to your database.
var db = utils.connectToDatabase(USER_OR_GROUP_NAME);

// TODO: Start defining your resource handlers. You may just need to modify the
// examples below, or you may need to add additional handlers by copying,
// pasting, and modifying these examples.

////////////////////////////////////////////////////////////////////////////////
// GET a list of artists. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/artists/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'artist'; // TODO: change to the type of item you want.

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'list-artists',   // TODO: change to the name of your HTML template.
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a single artist resource, which is a list of albums. ////////////////////
// Also get the artist's albums.////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/artists/:id',       // TODO: change to suit your URI design.
  function(req, res) {

    var item_type = 'artist'; // TODO: change to the type of item you want.

    // Get the item ID from the URI.
    var item_id = req.params.id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the items potentially related to this item.
      else {
        
        var related_type = 'album'; // TODO: change to type of related item.

        req.query.byArtist = item_id;
        
        
        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {
       
          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'artist', // TODO: change to name of your HTML template.
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a list of albums. ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/albums/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'album'; // TODO: change to the type of item you want.
    var item = req.body.item; //Get year info from search form, set as a variable to query db.

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {
  
      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'list-albums',   // TODO: change to the name of your HTML template.
          { items: items }
        );
      }
    });
  }
);


////////////////////////////////////////////////////////////////////////////////
// GET a list of albums by search criteria. ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//app.get('/albums/?datePublished',         // TODO: change to suit your URI design. 
//  function(req, res) {
//
//    var item_type = 'album'; // TODO: change to the type of item you want.
//    var item = req.body.item; //Get year info from search form, set as a variable to query db.
//
    // Get all items of the specified type from the database.
//    db.getSome(item_type, req.query.item, function(err, items) {
//  
      // If there was a database error, return an error status.
//      if (err) { res.send(err, 500); } 
//
      // Otherwise, use the returned data to render an HTML page.
//      else {
//        res.render(
//          'list-albums',   // TODO: change to the name of your HTML template.
//          { items: items, item: item }
//        );
//      }
//    });
//  }
//);



////////////////////////////////////////////////////////////////////////////////
// GET a single album resource, which a list of dependent songs. ///////////////
// Get those too as related items. /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/albums/:id',       // TODO: change to suit your URI design.
  function(req, res) {

    var item_type = 'album'; // TODO: change to the type of item you want.

    // Get the item ID from the URI.
    var item_id = req.params.id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the items potentially related to this item.
      else {
        
        var related_type = 'song'; // TODO: change to type of related item.

        req.query.inAlbum = item_id;
        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'album', // TODO: change to name of your HTML template.
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a list of songs by search criteria. ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/songs/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'song'; // TODO: change to the type of item you want.
    var item = req.body.item; //Get year info from search form, set as a variable to query db.

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {
  
      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'list-songs',   // TODO: change to the name of your HTML template.
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET the allsongs resource, which is a list of songs./////////////////////////
// Get the dependent type artist too.///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//app.get('/songs/',       // TODO: change to suit your URI design.
//  function(req, res) {
//
//    var item_type = 'song'; // TODO: change to the type of item you want.
//
    // Get the item ID from the URI.
//    var item_id = req.params.id;
//  
    // Get one item of the specified type, identified by the item ID.
//    db.getOne(item_type, item_id, function(err, item) {
//        
//      // If there was a database error, return an error status.
//      if (err) {
//        if (err.error == 'not_found') { res.send(404); }
//        else { res.send(err, 500); }
//      } 
//
      // Otherwise, get the items potentially related to this item.
//      else {
//        
//        var related_type = 'artist'; // TODO: change to type of related item.
//
        // Get all items of the specified related type.
//        db.getAll(related_type, function(err, items) {
//
          // If there was a database error, return an error status.
//          if (err) { res.send(err, 500); } 
//
          // Otherwise, use the returned data to render an HTML page.
//          else { res.render(
//              'list-songs', // TODO: change to name of your HTML template.
//              { items: items, related_items: items }
//            );
//          }
//        });
//      }
//    });
//  }
//);

////////////////////////////////////////////////////////////////////////////////
// GET a single song resource with a list of related albums. ///////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/songs/:id',       // TODO: change to suit your URI design.
  function(req, res) {

    var item_type = 'song'; // TODO: change to the type of item you want.

    // Get the item ID from the URI.
    var item_id = req.params.id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the items potentially related to this item.
      else {
        
        var related_type = 'album'; // TODO: change to type of related item.

        // Get all items of the specified related type.
        db.getAll(related_type, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'song', // TODO: change to name of your HTML template.
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET the root resource. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/',         // TODO: change to suit your URI design. 
  function(req, res) {

    var item_type = 'artist'; // TODO: change to the type of item you want.

    // Get all items of the specified type from the database.
    db.getAll(item_type, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render('index',   // TODO: change to the name of your HTML template.
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// POST to create an artist (ID created automatically). ////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/artists/', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    // See the form in `views/one-party.ejs`.
    var item = req.body.item;

    item.type = 'artist'; // TODO: change to the type of item you want

    // Save the new item to the database. (No ID specified, it will be created.)
    db.save(item, function(err) {
      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// POST to create an album (ID created automatically). /////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/albums/', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    // See the form in `views/one-party.ejs`.
    var item = req.body.item;

    item.type = 'album'; // TODO: change to the type of item you want

    // Save the new item to the database. (No ID specified, it will be created.)
    db.save(item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// POST to create a song (ID created automatically). ///////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/songs/', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    // See the form in `views/one-party.ejs`.
    var item = req.body.item;

    item.type = 'song'; // TODO: change to the type of item you want

    // Save the new item to the database. (No ID specified, it will be created.)
    db.save(item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// PUT to update an artist. ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/artists/:id', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    // See the form in `views/one-candidate.ejs`.
    var item = req.body.item;

    item.type = 'artist'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);


////////////////////////////////////////////////////////////////////////////////
// PUT to update an album. /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/albums/:id', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    // See the form in `views/album.ejs`.
    var item = req.body.item;

    item.type = 'album'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// PUT to update a song. ///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/songs/:id', // TODO: change to suit your URI design.
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    // See the form in `views/song.ejs`.
    var item = req.body.item;

    item.type = 'song'; // TODO: change to the type of item you want

    // Save the new item to the database, specifying the ID.
    db.save(item_id, item, function(err) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 
      
      // Otherwise, redirect back to the URI from which the form was submitted.
      else { res.redirect('back' ); }
    });
  }
);

// Handle GET of the "index" resource.
//app.get('/', function(req, res) { res.render('index'); });

// Start listening for incoming HTTP connections.
app.listen(process.env.PORT);
