import AuthenticatedRoute from './authenticated';

export default AuthenticatedRoute.extend({

  model() {
    return this.get('store').query('rental', {customLookup: true}).then(
      (data) => data).catch(err => {err});
    }
  })

