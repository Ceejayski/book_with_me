
export default function(server) {
  const user = server.create('user', {id: "6"});
  const user2 = server.create('user', {id: "5", username: 'Ted Mosby', email: 'ted@gmail.com'});

  const rental1 = server.create('rental', {city: 'New York', title: 'City with bookings 1', userId: user.id});
  const rental2 = server.create('rental', {city: 'New York', title: 'City with bookings 2', userId: user.id});

  server.create('booking', {start_at: '2018-04-26', end_at: '2018-04-28', userId: user2.id, rentalId: rental1.id});
  server.create('booking', {start_at: '2018-04-04', end_at: '2018-04-09', userId: user2.id, rentalId: rental1.id});
  server.create('booking', {start_at: '2018-04-19', end_at: '2018-04-23', userId: user2.id, rentalId: rental2.id});

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
