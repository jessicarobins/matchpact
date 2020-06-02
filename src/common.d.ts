interface Post {
  approvedAt: Date;
  completedAt?: Date;
  completedBy?: string;
  createdAt: Date;
  createdBy?: string;
  id: string;
  tweetUrl: string;
}
