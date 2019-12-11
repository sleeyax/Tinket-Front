import { TouchSequence } from 'selenium-webdriver';
export class User {

  constructor(user: object, token: string) {
    Object.keys(user).map((key) => {
      this[key] = user[key];
    });

    this.token = token;
  }

  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  onboardingCompletedAt?: Date;
  isAdmin: Boolean;
  token?: string;

  companyProfile?: {
    name: String,
    description: String,
    contactInfo: {
      email: String,
      phoneNumber: String,
      linkedIn: String
    },
    location: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    },
  };

  makerProfile?: {
    displayName: String,
    bio: String,
    experience: String,
    dateOfBirth: String,
    skills: any, //TODO: Specify this better.
    contactInfo: {
      email: String,
      phoneNumber: String,
      linkedIn: String
    },
    location: {
        country: String,
        city: String,
        street: String,
        postalCode: String,
    },
  };

  get representsCompany() : Boolean {
    return !!(this.companyProfile);
  }

  get isMaker() : Boolean {
    return !!(this.makerProfile);
  }
}
