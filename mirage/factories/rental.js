import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return i;
  },
  title(){
    return faker.lorem.words();
  },
  city(){
    return faker.address.city();
  },
  street(){
    return faker.address.streetName();
  },
  category(){
    return faker.list.random('apartment', 'house', 'condo')();
  },
  shared(){
    return faker.random.boolean();
  },
  image(){
    // return rentalImages[Math.floor(Math.random() * rentalImages.length)];
    return faker.list.random(...rentalImages)();
  },
  bedrooms(){
    return faker.list.random(1,2,3,4,5)();
  },
  description(){
    return faker.lorem.paragraph()
  },
  daily_rate(){
    return faker.list.random(13,21,33,44,25,13,123,41,23,42,41,54)();
  }
});

const rentalImages = [
  'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/1/image.jpeg',
  'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
  'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/12/image.jpeg',
  'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg'
  ]
