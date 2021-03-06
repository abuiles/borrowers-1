import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    showReturned: {
      refreshModel: true
    },
  },
  model: function(params) {
    var articles = this.modelFor('friends/show').get('articles');

    //
    // The return value from an async relationship is a PromiseArray
    // the property isFulfilled will become true when the proxied
    // promise has been fulfilled, in this case that would when we
    // get a response from the API.
    //

    if (articles.get('isFulfilled')) {
      articles.reload();
    }

    return articles.then(function(collection) {
      var result;

      if (!params.showReturned) {
        result = collection.filterBy('state', 'borrowed');
      } else {
        result = collection;
      }

      return result;
    });
  },
  actions: {
    save: function(model) {
      model.save();
      return false;
    }
  }
});
