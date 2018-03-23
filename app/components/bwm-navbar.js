import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service('session'),

  actions: {
    invalidateSession() {
      this.get('session').invalidate().then(() => this.get('router').transitionTo('/login'));
    },

    search() {
      const city = this.get('searchCity');
      if (city) {
        this.get('router').transitionTo('homes', city);
      }
    }
  }
});
