export class MakerProfile {
  displayName: String;
  bio: String;
  experience: String;
  dateOfBirth: String;
  skills: any; //TODO: Specify this better.
  contactInfo: {
    email: String,
    phoneNumber: String,
    linkedIn: String
  };
  location: {
      country: String,
      city: String,
      street: String,
      postalCode: String,
  };
}
