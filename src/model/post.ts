import { Author } from "./author";
import { Comment } from "./comment";
import { Content } from "./content";

export class Post {
  id: string;
  author: Author;
  content: Content[];
  comments: Comment[];
  publishedAt: Date;

  constructor(
    author: Author,
  ) {
    this.id = crypto.randomUUID();
    this.author = author
    this.publishedAt = new Date();
    this.content = [];
    this.comments = [];
  }

  setContent(content: Content[]) {
    this.content = content
  }

  addComment(comment: Comment) {
    this.comments.push(comment)
  }

  setComments(comments: Comment[]) {
    this.comments = comments
  }
}