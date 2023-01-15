import React from "react"
import { useForm } from "react-hook-form"
import { usePosts } from "./queries.gql"
import { useAddPost, useDeletePost, useEditPost } from "./mutations.gql"
import { QueryClient } from "react-query/types/core/queryClient"
import { Post as PostType, QueryResponse } from "./types"
import Post from "./components/Post"

type AppProps = {
  client: QueryClient
}

const App = ({ client }: AppProps): JSX.Element => {
  const { data, error, isLoading } = usePosts()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QueryResponse>()

  const { mutate: addPost } = useAddPost(client)
  const { mutate: deletePost } = useDeletePost(client)
  const { mutate: editPost } = useEditPost(client)

  const onSubmit = ({ body }: PostType) => {
    addPost({ body })
    reset()
  }

  const sortedPosts = data

  if (error) console.log(error)
  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <section className="p-5">
        {sortedPosts?.map((post: QueryResponse) => (
          <Post
            key={post.id}
            id={post.id}
            body={post.body}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            deletePost={deletePost}
            editPost={editPost}
          />
        ))}
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-50 w-min mr-auto flex flex-col gap-3 p-3">
        <input
          {...register("body", { required: true })}
          className={`outline-none bg-slate-200 border ${errors.body && `border-red-500 `}`}
        />
        <input
          type="submit"
          className="bg-slate-200 text-xs font-medium w-min px-4 py-1 cursor-pointer"
        />
      </form>
    </>
  )
}

export default App
