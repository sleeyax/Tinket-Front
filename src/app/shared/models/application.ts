import { User } from './user';
import { Assignment } from './assignment';

export class Application {
  _id: String;
  contacted: Boolean;
  maker: User;
  assignment: Assignment;
}
