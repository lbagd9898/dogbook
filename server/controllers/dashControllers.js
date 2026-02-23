import { prisma } from "../prismaClient.js";

export async function getPosts(req, res) {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  const following = await prisma.follow.findMany({
    where: {
      followerId: user.id,
    },
  });

  //list of ids for everybody the user follows
  const followingIds = following.map((f) => f.followedId);

  //user should see their own posts too
  followingIds.push(user.id);

  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        in: followingIds,
      },
    },
    orderBy: {
      date: "desc", // optional but usually expected
    },
  });
  const postIds = posts.map((post) => post.id);
  const likes = await getLikes(postIds);
  const authors = await getAuthors(followingIds);
  const comments = await getComments(postIds);

  const detailedPosts = posts.map((post) => ({
    ...post,
    likes: likes[post.id],
    author: authors[post.authorId],
    comments: comments[post.id],
  }));

  // console.log(detailedPosts);

  return res.status(200).json({ posts: detailedPosts });
}

//returns an object with comments for each post
export async function getComments(postIds) {
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

  // console.log(comments);

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

async function getLikes(postIds) {
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
  const likeCount = likes.reduce((acc, like) => {
    acc[like.postId] != null ? (acc[like.postId] += 1) : (acc[like.postId] = 1);
    return acc;
  }, {});
  return likeCount;
}

async function getAuthors(authorIds) {
  const authors = await prisma.user.findMany({
    where: {
      id: {
        in: authorIds,
      },
    },
  });
  const authorKeys = authors.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});
  return authorKeys;
}

export async function postPost(req, res) {
  console.log(req.body);
  //access post content from form
  const title = req.body.title;
  const content = req.body.content;

  //user comes from jwtverify
  const user = req.user;
  console.log(user);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  //create post
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    });
    console.log(newPost);
    return res.status(201).json({ newPost });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Database error" });
  }
}

export async function postUpdateLikes(req, res) {
  console.log("updatelikes reached");
  const { postId, liked } = req.body;
  const userId = req.user?.id;
  console.log(req.body);
  console.log(req.user);
  try {
    //if user liked post, add it to likes db
    if (liked) {
      const newLike = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      res.status(201).json(newLike);
    } else {
      //if user unlikes post
      const deleteLike = await prisma.like.deleteMany({
        where: {
          userId,
          postId,
        },
      });
      //if they can't find the like, notify client
      if (deleteLike.count === 0) {
        return res.status(404).json({ message: "like not found." });
      }
      res.status(200).json({ message: "like deleted" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function postComment(req, res) {
  console.log("post comment reached");
  //get user from verifytoken and make sure user exists
  const user = req.user;
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  try {
    const content = req.body.userComment;
    const postId = req.body.postId;
    const authorId = req.user.id;
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });

    console.log(comment);

    const allComments = await prisma.comment.findMany({
      where: {
        postId: postId,
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

    console.log(allComments);

    return res.status(201).json({ allComments });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "failed to post comment" });
  }
}
