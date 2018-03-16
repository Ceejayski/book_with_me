export default function() {
  this.namespace = '/api/v1';

  this.get('/rentals', () => {
    return {
      data: [{
        type: 'rentals',
        id: 'grand-old-mansion',
        attributes: {
          title: 'Grand Old Mansion',
          city: 'San Francisco',
          street: 'Some fake street',
          category: 'Estate',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 5,
          description: 'Very nice apartment in center of the city.',
          daily_rate: 43,
          created_at: '24/12/2018'
        }
      },
      {
        type: 'rentals',
        id: 'new-york-aparmtnet',
        attributes: {
          title: 'New York Apartment',
          city: 'New York',
          street: 'Some fake street',
          category: 'aparmtnet',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 2,
          description: 'Very nice apartment in center of the New York.',
          daily_rate: 100,
          created_at: '14/12/2018'
        }
      },
      {
        type: 'rentals',
        id: 'country-house-tarfifa',
        attributes: {
          title: 'Country house Tarifa',
          city: 'Tarifa',
          street: 'Fake street',
          category: 'house',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 12,
          description: 'Country side house with beutiful nature around',
          daily_rate: 23,
          created_at: '11/10/2018'
        }
      },
      {
        type: 'rentals',
        id: 'small-aparment-berlin',
        attributes: {
          title: 'Small apartment Berlin',
          city: 'Berlin',
          street: 'Some fake street',
          category: 'apartment',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 3,
          description: 'Apartment is located in historic center',
          daily_rate: 89,
          created_at: '09/07/2018'
        }
      },{
        type: 'rentals',
        id: 'small-aparment-berlin44',
        attributes: {
          title: 'Small apartment Berlin',
          city: 'Berlin',
          street: 'Some fake street',
          category: 'apartment',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 3,
          description: 'Apartment is located in historic center',
          daily_rate: 89,
          created_at: '09/07/2018'
        }
      },{
        type: 'rentals',
        id: 'small-aparment-berlin12',
        attributes: {
          title: 'Small apartment Berlin',
          city: 'Berlin',
          street: 'Some fake street',
          category: 'apartment',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 3,
          description: 'Apartment is located in historic center',
          daily_rate: 89,
          created_at: '09/07/2018'
        }
      },{
        type: 'rentals',
        id: 'small-aparment-berlin23',
        attributes: {
          title: 'Small apartment Berlin',
          city: 'Berlin',
          street: 'Some fake street',
          category: 'apartment',
          image: 'http://via.placeholder.com/350x250',
          bedrooms: 3,
          description: 'Apartment is located in historic center',
          daily_rate: 89,
          created_at: '09/07/2018'
        }
      }]
    }
  });
}
