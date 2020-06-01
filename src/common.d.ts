interface Post {
  approvedAt: Date;
  completeAt?: Date;
  completedBy?: string;
  createdAt: Date;
  createdBy?: string;
  id: string;
  tweetUrl: string;
}
