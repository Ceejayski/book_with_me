import Response from 'ember-cli-mirage/response';
import bcrypt from 'bcrypt';

export default function() {
  this.namespace = '/api/v1';

  this.get('/rentals', (schema) => {
    return schema.rentals.all();
  });

  this.get('/rentals/:id', (schema, request) => {
    return schema.rentals.find(request.params.id);
  });

  this.post('/users', function (schema, request) {
    return new Promise((resolve) => {
      const {username, password, password_confirmation, email} = JSON.parse(request.requestBody).user;

      if (password !== password_confirmation) {
        return resolve(new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
          errors: [{
            title: 'password is not same',
            detail: 'Password must be same as confirmation'
          }]
        }))
      }
      const existingUser = schema.db.users.where({email});

      if (existingUser.length !== 0) {
        return resolve(new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
          errors: [{
            title: 'User already exists',
            detail: 'User with this email already exists'
          }]
        }))
      }

      var salt = bcrypt.genSaltSync(10);
      var hashedPsw = bcrypt.hashSync(password, salt);

      const user = schema.users.create({
        username,
        email,
        password: hashedPsw
      });

      return resolve(this.serialize(user));
    });
  });
}
