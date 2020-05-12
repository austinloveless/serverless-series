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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($owner: String!) {
    onUpdateBlog(owner: $owner) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($owner: String!) {
    onDeleteBlog(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!, $editors: String!) {
    onCreatePost(owner: $owner, editors: $editors) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!, $editors: String!) {
    onUpdatePost(owner: $owner, editors: $editors) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!, $editors: String!) {
    onDeletePost(owner: $owner, editors: $editors) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String!, $postEditors: String!) {
    onDeleteComment(owner: $owner, postEditors: $postEditors) {
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
        }
        nextToken
      }
      owner
    }
  }
`;
