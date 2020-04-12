/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog($owner: String!) {
    onCreateBlog(owner: $owner) {
      id
      name
      posts {
        items {
          id
          title
          owner
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
      posts {
        items {
          id
          title
          owner
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
      posts {
        items {
          id
          title
          owner
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
      blog {
        id
        name
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
        }
        nextToken
      }
      owner
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String!) {
    onUpdatePost(owner: $owner) {
      id
      title
      blog {
        id
        name
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
        }
        nextToken
      }
      owner
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String!) {
    onDeletePost(owner: $owner) {
      id
      title
      blog {
        id
        name
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
        }
        nextToken
      }
      owner
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
      id
      content
      post {
        id
        title
        blog {
          id
          name
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
      id
      content
      post {
        id
        title
        blog {
          id
          name
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String!) {
    onDeleteComment(owner: $owner) {
      id
      content
      post {
        id
        title
        blog {
          id
          name
          owner
        }
        comments {
          nextToken
        }
        owner
      }
      owner
    }
  }
`;
