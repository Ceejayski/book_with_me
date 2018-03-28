import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  userService: service('user'),
  options: ['hala', 'bala'],
  rental: {},
  communityPropertyTypes: ['apartment', 'house', 'condo'],

  init() {
    this._super(...arguments);
    this.set('rental.shared', false);
    this.set('rental.user', this.get('userService').getUser());
  },

  actions: {
    uploadImage(newRental, file){
      this.set('rental.image', 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg');
    },
    submit(rental) {
      const rentalRecord =  this.get('store').createRecord('rental', this.get('rental'));
      rentalRecord.save().then(rental => {
        this.get('router').transitionTo('rentals.show', rental.get('id'));
      }).catch(reason => {
        this.get('store').deleteRecord(rentalRecord);
        this.set('errorMessages', reason.errors || reason);});
    }
  }
});
