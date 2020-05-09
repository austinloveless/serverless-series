/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($owner: String!) {
    onCreateBlog(owner: $owner) {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog($owner: String!) {
    onUpdateBlog(owner: $owner) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog($owner: String!) {
    onDeleteBlog(owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String!) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!, $editors: String!) {
    onUpdatePost(owner: $owner, editors: $editors) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String!, $postOwner: String!) {
    onDeleteComment(owner: $owner, postOwner: $postOwner) {
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
export const onCreateBlogUserJoin = /* GraphQL */ `
  subscription OnCreateBlogUserJoin {
    onCreateBlogUserJoin {
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
export const onUpdateBlogUserJoin = /* GraphQL */ `
  subscription OnUpdateBlogUserJoin {
    onUpdateBlogUserJoin {
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
export const onDeleteBlogUserJoin = /* GraphQL */ `
  subscription OnDeleteBlogUserJoin {
    onDeleteBlogUserJoin {
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
