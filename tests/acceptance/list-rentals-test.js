import { test } from 'qunit';
import moduleForAcceptance from 'book-with-me/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals', {
  beforeEach() {
    server.createList('rental', 10);
  }
});

test('visiting /', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function() {
    const isLoadedCard = find('.bwm-card').length === 10 ? true : false;
    assert.equal(isLoadedCard, true, 'should see rental cards');
  });
});

test('should show single view of rental', function (assert) {
  visit('/rentals/1');
  andThen(function() {
    assert.equal(find('.container').length > 0, true, 'should see rental cards');
  });
});
