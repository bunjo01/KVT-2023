import { Post } from "src/app/post/model/post.model";

export interface Comment {
  id: number;
  text: string;
  timeStamp: string; 
  replies: Comment[];
  repliesToComment: Comment;  belongsToUser: any;
}