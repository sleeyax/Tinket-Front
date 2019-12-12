import { TouchSequence } from 'selenium-webdriver';
import { MakerProfile } from './makerProfile';
import { CompanyProfile } from './companyProfile';
import { Skill } from './skill';

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
  skills: [
    string
  ]
  companyProfile?: CompanyProfile;
  makerProfile?: MakerProfile;
  token?: string;

  get representsCompany() : Boolean {
    return !!(this.companyProfile);
  }

  get isMaker() : Boolean {
    return !!(this.makerProfile);
  }
}
