import Ember from 'ember';

/*
A mixin that enriches a component that is attached to a model property that has validation
    support.

This mixin binds a property named `errors` to the model's `model.errors.@propertyName` array
 */

export default Ember.Mixin.create({
  init: function() {
    this._super(...arguments);
    Ember.assert(!Ember.isNone(this.get('propertyName')), 'propertyName is required.');
    Ember.defineProperty(this, 'serversideErrors', Ember.computed.filter('model.errors', function(error, index, array) {
      var nameSplit = error.message.source.pointer.split('/');
      var name = nameSplit[nameSplit.length - 1];
      return name == this.get('propertyName');
    }));
    Ember.defineProperty(this, 'errors', Ember.computed.union('serversideErrors',
        `model.validations.attrs.${this.get('propertyName')}.messages`));
  },
  status: Ember.computed('errors.length', 'form.isSubmitted', {
    get: function() {
      if (this.get('errors.length')) {
        if (this.get('form.showErrorsOnRender')) {
          this.set('canShowErrors', true);
        }
        if (this.get('form.showErrorsOnSubmit') && this.get('form.isSubmitted')) {
          this.set('canShowErrors', true);
        }
        return 'error';
      } else {
        return 'success';
      }
    }
  })
});
