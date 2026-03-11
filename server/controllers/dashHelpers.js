import { prisma } from "../prismaClient.js";

//list of users the currUser follows
export async function getFollowingUsers(userId) {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
  });
  return following;
}

export async function getFollowers(userId) {
  const followers = await prisma.follow.findMany({
    where: {
      followedId: userId,
    },
  });
  return followers;
}

//get posts for authored by all users in array
export async function getPosts(userIds) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: userIds,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          picUrl: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return posts;
}

//returns an object with comments for each post organized by postId
export async function getComments(postIds) {
  //fetch comments for all posts
  const comments = await prisma.comment.findMany({
    where: {
      postId: {
        in: postIds,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  //organize comments by corresponding post
  const organizedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.postId]) {
      acc[comment.postId] = [comment];
    } else {
      acc[comment.postId].push(comment);
    }
    return acc;
  }, {});

  return organizedComments;
}

export async function getLikes(postIds) {
  const likes = await prisma.like.findMany({
    where: {
      postId: {
        in: postIds,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return likes;
}

//takes list of likes and returns postIds that are liked by a specific user
export function areLikedByUser(likes, userId) {
  const areLikedByUser = likes.reduce((acc, like) => {
    if (like.userId === userId) acc.push(like.postId);
    return acc;
  }, []);
  return areLikedByUser;
}
