import request from "graphql-request"
import { useMutation, UseMutationResult } from "react-query"
import { QueryClient } from "react-query/types/core/queryClient"
import { Post } from "./types"

export const useAddPost = (
  queryClient: QueryClient
): UseMutationResult<unknown, unknown, Partial<Post>> => {
  return useMutation(
    async (post: Partial<Post>) => {
      const { addPost } = await request(
        "http://localhost:1337/graphql",
        `
            mutation {
              addPost(body: "${post.body}") {
                body
              }
            }
          `
      )
      return addPost
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-posts")
      },
    }
  )
}

export const useDeletePost = (
  queryClient: QueryClient
): UseMutationResult<unknown, unknown, Partial<Post>> => {
  return useMutation(
    async (post: Partial<Post>) => {
      const { deletePost } = await request(
        "http://localhost:1337/graphql",
        `
            mutation {
              deletePost(id: "${post.id}") {
                id
              }
            }
          `
      )
      return deletePost
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-posts")
      },
    }
  )
}

export const useEditPost = (
  queryClient: QueryClient
): UseMutationResult<unknown, unknown, Post> => {
  return useMutation(
    async (post: Post) => {
      const { editPost } = await request(
        "http://localhost:1337/graphql",
        `
            mutation {
              editPost(id: "${post.id}", body: "${post.body}") {
                id
                body
              }
            }
          `
      )
      return editPost
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-all-posts")
        console.log("EDIT MUTATION SUCCESSFUL")
      },
    }
  )
}
