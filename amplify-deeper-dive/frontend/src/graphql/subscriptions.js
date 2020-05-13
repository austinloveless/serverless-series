/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($owner: String!) {
    onCreateBlog(owner: $owner) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($owner: String!, $editors: String!) {
    onUpdateBlog(owner: $owner, editors: $editors) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($owner: String!) {
    onDeleteBlog(owner: $owner) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $owner: String!
    $editors: String!
    $writers: String!
  ) {
    onCreatePost(owner: $owner, editors: $editors, writers: $writers) {
      id
      title
      content
      thumbnail
      originalImage
      draft
      owner
      editors
      writers
      postBlogId
      postUserId
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $owner: String!
    $editors: String!
    $writers: String!
  ) {
    onUpdatePost(owner: $owner, editors: $editors, writers: $writers) {
      id
      title
      content
      thumbnail
      originalImage
      draft
      owner
      editors
      writers
      postBlogId
      postUserId
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $owner: String!
    $editors: String!
    $writers: String!
  ) {
    onDeletePost(owner: $owner, editors: $editors, writers: $writers) {
      id
      title
      content
      thumbnail
      originalImage
      draft
      owner
      editors
      writers
      postBlogId
      postUserId
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
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
        postBlogId
        postUserId
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
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
        postBlogId
        postUserId
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $owner: String!
    $postEditors: String!
    $postWriters: String!
  ) {
    onDeleteComment(
      owner: $owner
      postEditors: $postEditors
      postWriters: $postWriters
    ) {
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
        postBlogId
        postUserId
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
          postBlogId
          postUserId
        }
        nextToken
      }
      owner
    }
  }
`;
