import { Location } from './location';

export class CompanyProfile {
  name: String;
  description: String;
  contactInfo: {
    email: String,
    phoneNumber: String,
    linkedIn: String
  };
  location: Location;
}
