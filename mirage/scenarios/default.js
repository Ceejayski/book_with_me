
export default function(server) {
  const user = server.create('user');
  const user2 = server.create('user', {username: 'Ted Mosby'});

  const rental1 = server.create('rental', {city: 'New York', title: 'City with bookings 1', userId: user.id});
  const rental2 = server.create('rental', {city: 'New York', title: 'City with bookings 2', userId: user.id});

  server.create('booking', {start_at: '03/26/2018', end_at: '04/01/2018', userId: user2.id, rentalId: rental1.id});
  server.create('booking', {start_at: '04/04/2018', end_at: '04/09/2018', userId: user2.id, rentalId: rental1.id});
  server.create('booking', {start_at: '04/19/2018', end_at: '04/23/2018', userId: user2.id, rentalId: rental2.id});

  // server.create('rental', {city: 'Bratislava'});
  // server.create('rental', {city: 'Bratislava'});
  // server.create('rental', {city: 'Bratislava'});
  // server.create('rental', {city: 'Bratislava'});
  // server.create('rental', {city: 'Bratislava'});
  // server.create('rental', {city: 'New York'});
  // server.create('rental', {city: 'New York'});
  // server.create('rental', {city: 'New York'});
  // server.create('rental', {city: 'New York'});
  // server.create('rental', {city: 'New York'});
  // server.create('rental', {city: 'New York'});
}
