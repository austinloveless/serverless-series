/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
      id
      name
      thumbnail
      originalImage
      owner
      writers
      editors
      posts {
        items {
          id
          title
          content
          thumbnail
          originalImage
          draft
          owner
          editors
          writers
        }
        nextToken
      }
    }
  }
`;
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        thumbnail
        originalImage
        owner
        writers
        editors
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      content
      thumbnail
      originalImage
      draft
      owner
      editors
      writers
      comments {
        items {
          id
          content
          owner
          postEditors
          postWriters
        }
        nextToken
      }
      blog {
        id
        name
        thumbnail
        originalImage
        owner
        writers
        editors
        posts {
          nextToken
        }
      }
      user {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        owner
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        thumbnail
        originalImage
        draft
        owner
        editors
        writers
        comments {
          nextToken
        }
        blog {
          id
          name
          thumbnail
          originalImage
          owner
          writers
          editors
        }
        user {
          id
          username
          profilePicture
          about
          owner
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      content
      owner
      postEditors
      postWriters
      post {
        id
        title
        content
        thumbnail
        originalImage
        draft
        owner
        editors
        writers
        comments {
          nextToken
        }
        blog {
          id
          name
          thumbnail
          originalImage
          owner
          writers
          editors
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        owner
        postEditors
        postWriters
        post {
          id
          title
          content
          thumbnail
          originalImage
          draft
          owner
          editors
          writers
        }
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
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
          draft
          owner
          editors
          writers
        }
        nextToken
      }
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        profilePicture
        about
        posts {
          nextToken
        }
        owner
      }
      nextToken
    }
  }
`;
