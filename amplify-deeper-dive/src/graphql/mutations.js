/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      name
      thumbnail
      originalImage
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      users {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      name
      thumbnail
      originalImage
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      users {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      name
      thumbnail
      originalImage
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      users {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      title
      content
      thumbnail
      originalImage
      editors
      owner
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          content
          owner
          postOwner
        }
        nextToken
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      title
      content
      thumbnail
      originalImage
      editors
      owner
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          content
          owner
          postOwner
        }
        nextToken
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      title
      content
      thumbnail
      originalImage
      editors
      owner
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      comments {
        items {
          id
          content
          owner
          postOwner
        }
        nextToken
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      owner
      postOwner
      post {
        id
        title
        content
        thumbnail
        originalImage
        editors
        owner
        blog {
          id
          name
          thumbnail
          originalImage
          owner
        }
        comments {
          nextToken
        }
        user {
          id
          username
          profilePicture
          about
          owner
        }
      }
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      owner
      postOwner
      post {
        id
        title
        content
        thumbnail
        originalImage
        editors
        owner
        blog {
          id
          name
          thumbnail
          originalImage
          owner
        }
        comments {
          nextToken
        }
        user {
          id
          username
          profilePicture
          about
          owner
        }
      }
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      owner
      postOwner
      post {
        id
        title
        content
        thumbnail
        originalImage
        editors
        owner
        blog {
          id
          name
          thumbnail
          originalImage
          owner
        }
        comments {
          nextToken
        }
        user {
          id
          username
          profilePicture
          about
          owner
        }
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      profilePicture
      about
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      blogs {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      profilePicture
      about
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      blogs {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      profilePicture
      about
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          editors
          owner
        }
        nextToken
      }
      blogs {
        items {
          id
        }
        nextToken
      }
      owner
    }
  }
`;
export const createBlogUserJoin = /* GraphQL */ `
  mutation CreateBlogUserJoin(
    $input: CreateBlogUserJoinInput!
    $condition: ModelBlogUserJoinConditionInput
  ) {
    createBlogUserJoin(input: $input, condition: $condition) {
      id
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
export const updateBlogUserJoin = /* GraphQL */ `
  mutation UpdateBlogUserJoin(
    $input: UpdateBlogUserJoinInput!
    $condition: ModelBlogUserJoinConditionInput
  ) {
    updateBlogUserJoin(input: $input, condition: $condition) {
      id
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
export const deleteBlogUserJoin = /* GraphQL */ `
  mutation DeleteBlogUserJoin(
    $input: DeleteBlogUserJoinInput!
    $condition: ModelBlogUserJoinConditionInput
  ) {
    deleteBlogUserJoin(input: $input, condition: $condition) {
      id
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
          nextToken
        }
        users {
          nextToken
        }
        owner
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        blogs {
          nextToken
        }
        owner
      }
    }
  }
`;
