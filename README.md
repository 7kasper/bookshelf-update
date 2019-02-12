# bookshelf-update
Simple [Bookshelf.js](http://bookshelfjs.org) plugin that allows simple patching of models and skips updating if no values have changed.

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
```

## Working
This is a simple wrapper around `model.save(model.changed, {patch: true});`.
