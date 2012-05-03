////////////////////////////////////////////////////////////////////////////////

var USER_OR_GROUP_NAME = 'brwolfe';

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


////////////////////////////////////////////////////////////////////////////////
// GET a list of artists. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/artists/',     
  function(req, res) {

    var item_type = 'artist';

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'artists-list',  
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
app.get('/artists/:id',      
  function(req, res) {

    var item_type = 'artist'; 

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
        
        var related_type = 'album';

        req.query.byArtist = item_id;
                
        
        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {
       
          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'artist',
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
app.get('/albums/',         
  function(req, res) {

    var item_type = 'album'; 

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {
  
      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'albums-list',   
          { items: items }
        );
      }
    });
  }
);


////////////////////////////////////////////////////////////////////////////////
// GET a single album resource, which a list of dependent tracks. //////////////
// Get those too as related items. /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/albums/:id',     
  function(req, res) {

    var item_type = 'album'; 

    // Get the item ID from the URI.
    var item_id = req.params.id;
    
    req.query.inAlbum = item_id;
  
    // Get one item of the specified type, identified by the item ID.
    db.getOne(item_type, item_id, function(err, item) {
        
      // If there was a database error, return an error status.
      if (err) {
        if (err.error == 'not_found') { res.send(404); }
        else { res.send(err, 500); }
      } 

      // Otherwise, get the items potentially related to this item.
      else {
        
        var related_type = 'track'; 

        req.query.byArtist = item_id;
        
        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'album', 
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a list of tracks by search criteria. ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/tracks/',         
  function(req, res) {

    var item_type = 'track'; 
 
    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {
  
      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'tracks-list',  
          { items: items }
        );
      }
    });
  }
);


////////////////////////////////////////////////////////////////////////////////
// GET a single song resource with a list of related albums. ///////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/tracks/:id',  
  function(req, res) {

    var item_type = 'track'; 

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
        
        var related_type = 'album'; 

        // Get all items of the specified related type.
        db.getAll(related_type, function(err, items) {

          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'track',
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a list of formats. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/formats/',     
  function(req, res) {

    var item_type = 'format';

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'formats-list',   
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a single format resource, which is a list of tracks. ////////////////////
// Also get the related track information.//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/formats/:id',      
  function(req, res) {

    var item_type = 'format'; 

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
        
        var related_type = 'track';

        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {
       
          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'format', 
              { item: item, related_items: items }
            );
          }
        });
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a list of genres. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/genres/',     
  function(req, res) {

    var item_type = 'genre';

    // Get all items of the specified type from the database.
    db.getSome(item_type, req.query, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render(
          'genres-list',   
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// GET a single genre resource, which is a list of tracks. ////////////////////
// Also get the artist's albums.////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get('/genres/:id',      
  function(req, res) {

    var item_type = 'genre'; 

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
        
        var related_type = 'track';

        // Get all items of the specified related type.
        db.getSome(related_type, req.query, function(err, items) {
       
          // If there was a database error, return an error status.
          if (err) { res.send(err, 500); } 

          // Otherwise, use the returned data to render an HTML page.
          else {
            res.render(
              'genre', 
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
app.get('/', 
  function(req, res) {

    var item_type = 'artist';

    // Get all items of the specified type from the database.
    db.getAll(item_type, function(err, items) {

      // If there was a database error, return an error status.
      if (err) { res.send(err, 500); } 

      // Otherwise, use the returned data to render an HTML page.
      else {
        res.render('index',  
          { items: items }
        );
      }
    });
  }
);

////////////////////////////////////////////////////////////////////////////////
// POST to create an artist (ID created automatically). ////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/artists/',
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    var item = req.body.item;

    item.type = 'artist'; 

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
app.post('/albums/', 
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    var item = req.body.item;

    item.type = 'album';

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
// POST to create a track (ID created automatically). ///////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/tracks/',
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    var item = req.body.item;

    item.type = 'track';

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
// POST to create a format (ID created automatically). ////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/formats/',
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    var item = req.body.item;

    item.type = 'format';

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
// POST to create a genre (ID created automatically). //////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.post('/genres/',
  function(req, res) {
  
    // Get the item info that was POSTed from the input form.
    var item = req.body.item;

    item.type = 'genre'; //

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
app.put('/artists/:id', 
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    var item = req.body.item;

    item.type = 'artist'; 
    
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
app.put('/albums/:id', 
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    var item = req.body.item;

    item.type = 'album';

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
// PUT to update a track. //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/tracks/:id', 
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    var item = req.body.item;

    item.type = 'track';

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
// PUT to update a format. /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/formats/:id', 
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    var item = req.body.item;

    item.type = 'format'; 

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
// PUT to update a genre. /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.put('/genres/:id', 
  function(req, res) {
  
    // Get the item ID from the URI.
    var item_id = req.params.id;

    // Get the item info that was PUT from the input form.
    var item = req.body.item;

    item.type = 'genre'; 

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
