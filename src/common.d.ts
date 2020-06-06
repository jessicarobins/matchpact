declare module 'react-twitter-embed';

interface Post {
  approvedAt: Date;
  completedAt?: Date;
  completedBy?: string;
  completers?: string[];
  createdAt: Date;
  createdBy?: string;
  id: string;
  reporters?: string[];
  postUrl: string;
}
