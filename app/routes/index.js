import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.get('store').findAll('rental', {
       title: 'Some nice apartment',
       city: 'New York',
       street: 'Time Square',
       category: 'Apartment',
       image: 'http://via.placeholder.com/350x250',
       bedrooms: 5,
       description: 'Very nice cozy apartment',
       daily_rate: 20,
       created_at: '20/4/2018' })
  }
});
