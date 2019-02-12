module.exports = (bookshelf) => {
  bookshelf.Model = bookshelf.Model.extend({
    async update() {
      if (this.isNew()) {
        // If the model is new do regular save instead of update.
        return await this.save();
      } else if (Object.entries(this.changed).length !== 0) {
        // Otherwise only update the changes if present.
        return await this.save(this.changed, {patch: true});
      } else {
        // When there are no changes, just return original object.
        return this;
      }
    }
  });
}