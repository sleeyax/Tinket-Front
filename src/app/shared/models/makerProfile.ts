import { Location } from './location';

export class MakerProfile {
  displayName: String;
  bio: String;
  experience: String;
  dateOfBirth: Date;
  skills: any; //TODO: Specify this better.
  contactInfo: {
    email: String,
    phoneNumber: String,
    linkedIn: String
  };
  location: Location;
}
