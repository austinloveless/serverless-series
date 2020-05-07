/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
          owner
        }
        nextToken
      }
      owner
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
        posts {
          nextToken
        }
        owner
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
      blog {
        id
        name
        thumbnail
        originalImage
        posts {
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
      owner
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
        owner
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
      postOwner
      post {
        id
        title
        content
        thumbnail
        originalImage
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
        owner
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
        postOwner
        post {
          id
          title
          content
          thumbnail
          originalImage
          owner
        }
      }
      nextToken
    }
  }
`;
