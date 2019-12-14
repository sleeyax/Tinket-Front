import { User } from './user';
import { Location } from './location';
import { Skill } from './skill';

export class Assignment {
  title: String;
  videoUrl: String;
  description: String;
  requiredSkills: Skill[];
  location: Location;
  candidates: [{
    contacted: Boolean,
    user: User
  }];
  open: boolean;
  archivedAt: Date;
  createdBy: User;
}
