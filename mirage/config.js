import Response from 'ember-cli-mirage/response';
import bcrypt from 'bcrypt';
import jwt from 'npm:jwt-simple';
import moment from 'moment';
import { underscore } from '@ember/string';
const SECRET = 'askdasdnasdn';

export default function() {
  this.namespace = '/api/v1';

  this.getMRoute = (path, middleware, callback) => {
    this.get(path, function(schema, request) {
      const err = middleware(request);
      if (err) return err;

      return callback(schema, request);
    });
  };

  this.postMRoute = (path, middleware, callback) => {
    this.post(path, function (schema, request){
      const err = middleware(request);
      if (err) return err;

      return callback.call(this, schema, request);
    });
  };

  this.getMRoute('/secret', authMiddleware, () => {});

  this.postMRoute('/bookings', authMiddleware, function(schema) {
    const attrs = underscorize(this.normalizedRequestAttrs());
    const booking = schema.bookings.new(attrs);

    if (!booking.attrs.start_at || !booking.attrs.end_at || !booking.attrs.userId || !booking.attrs.rentalId) {
      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          title: 'Data missing',
          detail: 'Start at or End at dates are missing '
        }]
      })
    }

    const currentRental = schema.rentals.find(booking.rentalId);

    if (currentRental.userId == booking.userId) {
      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          title: 'Invalid user',
          detail: 'You cannot place booking on your own rental'
        }]
      })
    }

    if (isValidBooking(booking, currentRental)) {
      booking.save();
      return this.serialize(booking);
    } else {
      return new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          title: 'Invalid booking',
          detail: 'Choosen dates are already taken.'
        }]
      })
    }
  });

  function isValidBooking(proposedBooking, rental) {
    let isValid = false;

    if (rental.bookings && rental.bookings.length) {
       isValid = rental.bookings.models.every(booking => {

        const proposedStart = moment(proposedBooking.attrs.start_at);
        const proposedEnd = moment(proposedBooking.attrs.end_at);
        const actualStart = moment(booking.attrs.start_at);
        const actualEnd = moment(booking.attrs.end_at);

        return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
      });
    }

    return isValid;
  }


  this.get('/rentals', (schema, request) => {
    let rentals = [];
    const city = request.queryParams['filter[city]'];

    if (city) {
      rentals = schema.rentals.where({city});
    } else {
      rentals = schema.rentals.all();
    }

    return rentals.length > 0 ? rentals : new Response(422, {some: 'header', 'Content-Type': 'application/json'}, {
        errors: [{
          title: 'No rentals found',
          detail: 'There are no rentals for city ' + city,
          source: {
            pointer: "/data",
          },
        }]
      })
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

function underscorize(attrs) {
  const payload = {};

  Object.keys(attrs).forEach((key) => {
    if (key !== 'id' && key.toLowerCase().indexOf("id") <= 0) {
      payload[underscore(key)] = attrs[key];
      delete attrs[key];
    } else {
      payload[key] = attrs[key];
    }
  });

  return payload;
}

