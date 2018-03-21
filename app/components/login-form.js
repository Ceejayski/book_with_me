import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    const registered = this.get('router.currentState.routerJsState.fullQueryParams.r');
    this.set('registered', registered);
  },
  actions: {
    submit(){

    }
  }
});
