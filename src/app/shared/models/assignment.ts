import { User } from './user';
import { Location } from './location';
import { Skill } from './skill';

export class Assignment {
  _id: String;
  title: String;
  videoUrl: String;
  description: String;
  requiredSkills: Skill[];
  location: Location;
  open: boolean;
  createdBy: User;
  archivedAt?: Date;
  candidates?: [{
    contacted: Boolean,
    user: User
  }];
  flaggedAt?: Date;
  flagResolvedAt?: Date;
  deletedAt?: Date;
}
