export class Review {
    _id: string;
    anonymous: boolean;
    description: string;
    score: Number;
    reviewedBy?: {
        reviewedById: number,
        email: string,
        firstname: string,
        lastname: string,
    };
    flaggedAt?: Date;
    flagSolvedAt?: Date;
    deletedAt?: Date;
  }
  