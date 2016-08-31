import Ember from 'ember';
import Utils from 'ember-rapid-forms/utils/utils';
import layout from '../templates/components/em-form';

/*
Form View

A component for rendering a form element.

Syntax:
{{em-form
    //The layout of the form
    form_layout="form|inline|horizontal"
    //The model bound to the form if any
    model="some_model_instance"
    //The action to be invoked on the controller when a form is submitted.
    action="some_action"
    //if true a submit button will be rendered
    submitButton=true|false
    //if true validation icons will be rendered
    validationIcons=true|false
}}
*/
export default Ember.Component.extend({
  layout: layout,
  tagName: 'form',
  classNameBindings: ['formLayoutClass'],
  attributeBindings: ['role'],
  role: 'form',
  formLayoutClass: Ember.computed('formLayout', {
    get: function() {
      switch (this.get('formLayout')) {
        case 'horizontal':
        case 'inline':
          return "form-" + (this.get('formLayout'));
        default:
          return 'form';
      }
    }
  }),
  isDefaultLayout: Utils.createBoundSwitchAccessor('form', 'formLayout', 'form'),
  isInline: Utils.createBoundSwitchAccessor('inline', 'formLayout', 'form'),
  isHorizontal: Utils.createBoundSwitchAccessor('horizontal', 'formLayout', 'form'),
  action: 'submit',
  model: null,
  formLayout: 'form',
  submitButton: true,
  validationIcons: true,
  showErrorsOnRender: false,
  showErrorsOnFocusIn: false,
  showErrorsOnSubmit: true,
  errors: Ember.computed.filter('model.errors', function(error, index, array) {
    return error.message.source.pointer == "/data";
  }),

  /*
  Form submit

  Optionally execute model validations and perform a form submission.
   */
  submit(e) {
    if (e) {
      e.preventDefault();
    }
    return this.sendAction('action', this.get('model'));
  }
});
