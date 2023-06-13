import { Comment } from "../API";

export interface CommentWithUserEmail extends Comment {
	userEmail: string;
}
