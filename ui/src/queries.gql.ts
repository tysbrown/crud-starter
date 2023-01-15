import request from "graphql-request"
import { useQuery, UseQueryResult } from "react-query"
import { QueryResponse } from "./types"

export const usePosts = (): UseQueryResult<QueryResponse[]> => {
  return useQuery("get-all-posts", async () => {
    const { posts } = await request(
      "http://localhost:1337/graphql",
      `
        query {
          posts {
            id
            createdAt
            updatedAt
            body
          }
        }
      `
    )
    return posts
  })
}
