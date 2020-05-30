interface Post {
  createdAt: Date;
  id: string;
  text: string;
  votes: { [userId: string]: boolean };
}

interface Vote {
  createdAt?: Date;
  id: string;
  truth: boolean;
}

interface VoteMap {
  [postId: string]: Vote;
}
