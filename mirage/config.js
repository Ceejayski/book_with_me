export default function() {
  this.namespace = '/api/v1';

  this.get('/rentals', (schema, request) => {
    return schema.rentals.all();
  });

  this.get('/rentals/:id', (schema, request) => {
    return schema.rentals.find(request.params.id);
  });
}
