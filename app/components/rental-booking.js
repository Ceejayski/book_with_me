import Component from '@ember/component';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default Component.extend({
  dates: service('dates'),
  session: service('session'),
  takenDates: [],
  booking: null,

  init() {
    this._super(...arguments);
    this.set('takenDates', []);
    this.getTakenDates();
    // this.getCurrentUser();
  },

  getTakenDates(){
    const bookings = this.get('rental.bookings');

    if (bookings && bookings.length) {
      bookings.forEach(booking => {
        const range = this.get('dates').getRangeOfDates(booking.get('start_at'), booking.get('end_at'));
        range.forEach(date => this.takenDates.push(date));
        this.get('takenDates').pushObject(booking.get('start_at'));
        this.get('takenDates').pushObject(booking.get('end_at'));
      });
    }
  },

  getCurrentUser(){
    this.get('session.store').restore().then(({authenticated}) => {
    this.set('booking.user.id', authenticated.email);
    })
  },

  actions: {
    validateDate: function(date) {
      return this.get('takenDates').includes(date.format('Y-MM-DD')) || date.diff(moment(), 'days', true) <= 0;
    }
  }
});
