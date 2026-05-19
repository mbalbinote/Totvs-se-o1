import { faker } from '@faker-js/faker';
import { Gender } from '../pages/SignupPage';

export interface UserData {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

const SUPPORTED_COUNTRIES = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
] as const;

export function generateUserData(): UserData {
  const gender: Gender = faker.helpers.arrayElement(['Mr', 'Mrs']);
  const sexType = gender === 'Mr' ? 'male' : 'female';

  const firstName = faker.person.firstName(sexType);
  const lastName = faker.person.lastName();
  const birthDate = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });

  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName, provider: 'testmail.com' }).toLowerCase(),
    password: faker.internet.password({ length: 12, memorable: false }),
    gender,
    firstName,
    lastName,
    birthDay: String(birthDate.getDate()),
    birthMonth: String(birthDate.getMonth() + 1),
    birthYear: String(birthDate.getFullYear()),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.helpers.arrayElement(SUPPORTED_COUNTRIES),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobileNumber: faker.phone.number({ style: 'international' }),
  };
}
