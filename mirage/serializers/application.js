import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  keyForAttribute: function(attr) {
    debugger;
    return Ember.String.underscore(attr);
  },
  keyForRelationship: function(key) {
    return Ember.String.underscore(key);
  }
});
