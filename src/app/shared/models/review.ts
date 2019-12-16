import { User } from './user';

export class Review {
    creator: {
        anonymous: boolean;
        user: User;
    }
    score: Number;
    reviewed: string;
    description: string;
    _id?: string;
    flaggedAt?: Date;
    flagResolvedAt?: Date;
    deletedAt?: Date;
}
