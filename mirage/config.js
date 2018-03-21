import Response from 'ember-cli-mirage/response';
import bcrypt from 'bcrypt.js';

export default function() {
  this.namespace = '/api/v1';

  this.get('/rentals', (schema) => {
    return schema.rentals.all();
  });

  this.get('/rentals/:id', (schema, request) => {
    return schema.rentals.find(request.params.id);
  });

  this.post('/users', (schema, request) => {
    const {username, password, password_confirmation, email} = request.params;

    if (password !== password_confirmation) {
      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          status: 422,
          title: 'password is not same',
          description: 'password must be same as confirmation'
        }]
      });
    }
    const existingUser = schema.db.users.where({email});

    if (existingUser) {
      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          status: 422,
          title: 'User already exists',
          description: 'User with this email already exists'
        }]
      });
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPsw = bcrypt.hashSync(password, salt);

    const user = schema.db.users.new({
      username,
      email,
      password: hashedPsw
    });

    return schema.db.users.create(user);
  });
}
