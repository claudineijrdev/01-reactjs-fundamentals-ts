import { faker } from '@faker-js/faker';
import { Content, PostType } from '../model/content';
import { Post } from '../model/post';
import { Author } from '../model/author';
import { Comment } from '../model/comment';
const generateComments = (): Comment[] => {
  const size = faker.number.int({ min: 0, max: 3 })

  const comments: Comment[] = []

  for (let i = 0; i < size; i++) {
    const author = new Author(faker.image.avatar(), faker.person.fullName())
    const content = faker.lorem.sentence(faker.number.int({ min: 5, max: 20 }))
    const comment = new Comment(author, content)
    comment.setLikes(faker.number.int(20))
    comments.push(comment)
  }
  return comments
}

const generatePostContent = (type: PostType, quantity: number, min?: number, max?: number): Content[] => {
  const content: Content[] = []

  for (let i = 0; i < quantity; i++) {
    switch (type) {
      case PostType.PARAGRAPH:
        content.push({
          type,
          content: faker.lorem.sentence(faker.number.int({ min, max }))
        });
        break;
      case PostType.LINK:
        content.push({
          type,
          content: faker.internet.url()
        });
        break;
      case PostType.HASHTAG:
        content.push({
          type,
          content: `#${faker.lorem.word()}`
        })
    }
  }
  return content
}

const generatePosts = (size: number): Post[] => {
  const posts: Post[] = []
  for (let i = 0; i < size; i++) {
    const author = new Author(
      faker.image.avatar(),
      faker.person.fullName(),
      faker.person.jobTitle(),
    )
    const post = new Post(author)
    const content = [
      ...generatePostContent(PostType.PARAGRAPH, faker.number.int({ min: 2, max: 5 }), 5, 50),
      ...generatePostContent(PostType.LINK, faker.number.int({ min: 0, max: 3 })),
      ...generatePostContent(PostType.HASHTAG, faker.number.int({ min: 1, max: 5 }))
    ]
    post.setContent(content)
    post.setComments(generateComments())

    posts.push(post)
  }
  return posts
}

export {
  generatePosts,
  generateComments,
  generatePostContent,
}