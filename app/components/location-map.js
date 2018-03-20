import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  maps: service(),

  didInsertElement() {
    this._super(...arguments);
    let address = this.get('city') + ',' + this.get('street');
    let mapElement = this.get('maps').getMapElement(address);
    this.$("#map").parent('.ember-view').css({height: '100%'});
    this.$("#map" ).replaceWith(mapElement);
  }
});
