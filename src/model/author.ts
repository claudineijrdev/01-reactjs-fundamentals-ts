export class Author {
  avatarUrl: string;
  name: string;
  role?: string;

  constructor(
    avatarUrl: string,
    name: string,
    role?: string
  ) {
    this.avatarUrl = avatarUrl;
    this.name = name;
    this.role = role;
  }

}
