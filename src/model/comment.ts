import { Author } from "./author";

export class Comment {
  id: string;
  author: Author;
  content: string;
  publishedAt: Date;
  likes: number;

  constructor(author: Author, content: string) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.content = content;
    this.publishedAt = new Date();
    this.likes = 0;
  }

  setLikes(likes: number) {
    this.likes = likes;
  }

  doLike() {
    this.likes += 1;
  }
}
