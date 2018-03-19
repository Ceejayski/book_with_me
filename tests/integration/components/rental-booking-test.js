import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rental-booking', 'Integration | Component | rental booking', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#rental-booking}}
    {{/rental-booking}}
  `);

  assert.equal(this.$('.booking').length > 0, true);
});
