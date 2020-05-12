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
        }
        nextToken
      }
      editors
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
        posts {
          nextToken
        }
        editors
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
      comments {
        items {
          id
          content
          owner
          postEditors
        }
        nextToken
      }
      blog {
        id
        name
        thumbnail
        originalImage
        owner
        posts {
          nextToken
        }
        editors
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
        comments {
          nextToken
        }
        blog {
          id
          name
          thumbnail
          originalImage
          owner
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
      post {
        id
        title
        content
        thumbnail
        originalImage
        draft
        owner
        editors
        comments {
          nextToken
        }
        blog {
          id
          name
          thumbnail
          originalImage
          owner
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
        post {
          id
          title
          content
          thumbnail
          originalImage
          draft
          owner
          editors
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
