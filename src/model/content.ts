export enum PostType {
  LINK = 'link',
  PARAGRAPH = 'paragraph',
  HASHTAG = 'hashtag'
}

export class Content {
  type: PostType;
  content: string;

  constructor(type: PostType, content: string) {
    this.type = type;
    this.content = content;
  }
}
