module.exports = (bookshelf) => {
  class UpdateModel extends bookshelf.Model {
    async update() {
      if (this.isNew()) {
        // If the model is new do regular save instead of update.
        return await this.save();
      } else if (this.changed) {
        // Otherwise only update the changes if present.
        return await this.save(this.changed, {patch: true});
      } else {
        // When there are no changes, just return original object.
        return this;
      }
    }
  }
  bookshelf.Model = UpdateModel;
}