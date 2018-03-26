import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  rentals: hasMany('rentals'),
  bookings: hasMany('booking')
});
