import { Comment, TimeEntry } from "../API";

export interface CommentWithUserEmail extends Comment {
	userEmail: string;
}

export interface TimeEntryWithUserEmail extends TimeEntry {
	userEmail: string;
}
