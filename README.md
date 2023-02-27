# bookshelf-update
Simple [Bookshelf.js](http://bookshelfjs.org) plugin that allows simple 
patching of models and skips updating if no values have changed.

See also: [bookshelf-spotparse](https://www.npmjs.com/package/bookshelf-spotparse), 
a plugin that makes formatting, parsing and finding models easier.

## Installation
* Install with npm using `npm i bookshelf-update`
* After creating a bookshelf instance, call the plugin method:
```javascript
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('bookshelf-update');
```
* The update method can now be used on all your models.

## Example
```javascript
/**
 * Save new user 'ernie' to database.
 * Since the user isNew(), the update function
 * will perform a full insert operation.
 */
new User({
    username: 'ernie',
    password: 'meepmoop',
}).update()
.then(usr => console.dir(usr))
.catch(err => console.log(err));

/**
 * Get user 'ernie', and update its password to 'meepmeep'.
 * Only the password field is updated and on second attempt no
 * update query is run.
 */
User.where({username: 'ernie'}).fetch()
.then(usr => usr.set('password', 'meepmeep'))
.then(usr => usr.update())
.then(usr => console.dir(usr))
.catch(err => console.log(err));
});

/**
 * When creating a user with the ID already specified
 * you might need to force an insert like so:
 */
new User({
    id: '11',
    username: 'ernie',
    password: 'meepmoop',
}).update({forceInsert: true})
.then(usr => console.dir(usr))
.catch(err => console.log(err));
```

## Working
This is a simple wrapper around `model.save(model.changed, {patch: true});`.
