import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Content } from '../model/content';
import { Comment as CommentModel } from '../model/comment';
import { Author } from '../model/author';

type PostComponentProps = {
  author: Author
  content: Content[]
  publishedAt: Date
  comments: CommentModel[]
}


const getHashTags = (content: Content[]) => {
  return content.filter(line => {
    return line.type === 'hashtag'
  })
}

export function Post({ author, content, publishedAt, comments }: PostComponentProps) {

  const [postComments, setComments] = useState<CommentModel[]>([...comments])
  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateComment(event: FormEvent) {
    event.preventDefault()
    const newComment = new CommentModel(author, newCommentText)
    setComments([...postComments, newComment])
    setNewCommentText('')
  }

  function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleValidComment(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório')
  }

  function deleteComment(id: string) {
    setComments(postComments.filter(comment => comment.id !== id))
  }

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR });
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()} >{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {
          content.map((line, index) => {
            if (line.type === 'paragraph') {
              return <p key={index}>{line.content}</p>
            }
            if (line.type === 'link') {
              return <p key={index}><a href="#">{line.content}</a></p>
            }
          })
        }
        {
          getHashTags(content).map((line, index) => {
            if (line.type === 'hashtag') {
              return <span key={index}><a href="#">{line.content}{' '}</a></span>
            }
          })
        }
      </div>
      <form onSubmit={handleCreateComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Escreva um comentário"
          name='comment'
          onChange={handleNewComment}
          value={newCommentText}
          onInvalid={handleValidComment}
          required
        />
        <footer>
          <button type='submit' disabled={!newCommentText} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {
          postComments.map((comment) => {
            return <Comment
              key={comment.id}
              author={comment.author}
              content={comment.content}
              likes={comment.likes}
              publishedAt={comment.publishedAt}
              commentId={comment.id}
              deleteComment={deleteComment}
            />
          })
        }
      </div>
    </article>
  )
}
