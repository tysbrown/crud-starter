import React, { useState, useEffect, useRef } from "react"
import { UseMutateFunction } from "react-query"
import { QueryResponse } from "../types"
import { FieldValues, useForm } from "react-hook-form"
import { format } from "date-fns"
import { Post as PostType } from "../types"

type Props = QueryResponse & {
  deletePost: UseMutateFunction<unknown, unknown, Partial<PostType>, unknown>
  editPost: UseMutateFunction<unknown, unknown, PostType, unknown>
}

const Post = ({ body, id, createdAt, updatedAt, deletePost, editPost }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const { register, handleSubmit, setFocus } = useForm()

  // Resize the textarea to fit the content, on mount and when edit/save button is clicked
  useEffect(() => {
    const textField = document.getElementById(id.toString())
    if (textField) {
      textField.style.height = `${textField.scrollHeight}px`
    }
  }, [isEditing])

  // Put focus on the input when edit button is clicked
  useEffect(() => {
    if (isEditing) {
      setFocus("body")
    }
  }, [isEditing])

  const onSubmit = ({ body }: FieldValues) => {
    setIsEditing(false)
    editPost({ id, body, createdAt, updatedAt })
  }

  const formattedCreatedAt = format(Number(createdAt), "MMM d, yyyy - h:mm a")
  const formattedUpdatedAt = format(Number(updatedAt), "MMM d, yyyy - h:mm a")

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-50 p-3 w-[40rem] mb-5">
      <section className="flex flex-col gap-1">
        <textarea
          {...register("body", { required: true })}
          id={id.toString()}
          defaultValue={body}
          className={`${isEditing ? `bg-slate-200` : `bg-slate-50`} outline-none resize-none`}
          disabled={!isEditing}
        />
      </section>
      <section className="flex gap-1">
        <button
          onClick={() => deletePost({ id })}
          className="mt-3 bg-slate-200 text-xs font-medium w-min px-4 py-1">
          Delete
        </button>

        {isEditing ? (
          <input
            type="submit"
            value="Save"
            disabled={!isEditing}
            className="mt-3 bg-slate-200 text-xs font-medium w-min px-4 py-1 cursor-pointer"
          />
        ) : (
          <button
            onClick={() => {
              setIsEditing(true)
            }}
            disabled={isEditing}
            className="mt-3 bg-slate-200 text-xs font-medium w-min px-4 py-1">
            Edit
          </button>
        )}
      </section>
      <section className="mt-2">
        <p className="text-xs text-gray-500">Created at: {formattedCreatedAt}</p>
        <p className="text-xs text-gray-500">Updated at: {formattedUpdatedAt}</p>
      </section>
    </form>
  )
}

export default Post
