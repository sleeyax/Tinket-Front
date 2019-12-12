export class CompanyProfile {
  name: String;
  description: String;
  contactInfo: {
    email: String,
    phoneNumber: String,
    linkedIn: String
  };
  location: {
      country: String,
      city: String,
      postalCode: String,
  };
}
