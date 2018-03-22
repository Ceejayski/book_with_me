import Response from 'ember-cli-mirage/response';
import bcrypt from 'bcrypt';
import jwt from 'npm:jwt-simple';
const SECRET = 'askdasdnasdn';

export default function() {
  this.namespace = '/api/v1';

  this.getMRoute = (path, middleware, callback) => {
    this.get(path, (schema, request) => {
      const err = middleware(request);
      if (err) return err;

      return callback(schema, request);
    });
  };

  this.getMRoute('/secret', authMiddleware, () => {});

  this.get('/rentals', (schema) => {
    return schema.rentals.all();
  });

  this.get('/rentals/:id', (schema, request) => {
    return schema.rentals.find(request.params.id);
  });

  this.post('/auth', function(schema, request) {
    const { email, password } = JSON.parse(request.requestBody).user;
    const foundUser = schema.db.users.where({email})[0];
    if (foundUser) {
      const isUserPassword = bcrypt.compareSync(password, foundUser.password);

      if (isUserPassword) {
        return {
          token: jwt.encode({userId: foundUser.id, email: foundUser.email, username: foundUser.username}, SECRET),
          email: foundUser.email
          }
        }
      }

      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          title: 'Email not found',
          detail: 'Wrong email or password'
        }]
      })
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
      const existingUser = schema.db.users.where({email})[0];

      if (existingUser) {
        return resolve(new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
          errors: [{
            title: 'User already exists',
            detail: 'User with this email already exists'
          }]
        }))
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPsw = bcrypt.hashSync(password, salt);

      const user = schema.users.create({
        username,
        email,
        password: hashedPsw
      });

      return resolve(this.serialize(user));
    });
  });
}

function authMiddleware(request) {
  const token = request.requestHeaders.Authorization || '';
  if (token) {
    const user = parseJwt(token.split(' ')[1]);
    if (user.email) return;
  }
  return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
    errors: [{
      title: 'Not authorized',
      detail: 'You are not authorized!'
    }]
  })
}

function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
