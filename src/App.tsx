import { Header } from "./components/Header"
import './global.css'
import { Post } from "./components/Post"
import styles from "./App.module.css"
import { Sidebar } from "./components/Sidebar"
import { generatePosts } from "./utils/fake-generator"



export function App() {
  const posts = generatePosts(4)
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (
                <Post
                  key={post.id}
                  author={post.author}
                  content={post.content}
                  publishedAt={post.publishedAt}
                  comments={post.comments}
                />
              )
            })
          }
        </main>
      </div>
    </>
  )
}