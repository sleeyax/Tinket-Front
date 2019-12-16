import { User } from './user';

export class Review {
    creator: {
        anonymous: boolean;
        user: User;
    }
    score: Number;
    _id: string;
    reviewed: string;
    description: string;
    flaggedAt?: Date;
    flagResolvedAt?: Date;
    deletedAt?: Date;
}
