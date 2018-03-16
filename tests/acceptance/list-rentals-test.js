import { test } from 'qunit';
import moduleForAcceptance from 'book-with-me/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('should list available rentals.', function (assert) {
    visit('/');
    andThen(function() {
      assert.equal(find('.bwm-card').length > 0, true, 'should see rental cards');
  });
});
