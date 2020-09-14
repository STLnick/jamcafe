import { ObjectId } from 'mongodb';
import client from './client';

/* * Users * */
export const addUser = async (newUser) => {
  try {
    return await client.db('jamcafe').collection('users')
      .insertOne(newUser);
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: Implement firebase-admin to allow deletion of users
// TODO: Will need to implement on server-side mainly from reading
export const deleteUser = async ({ _id }) => {
  try {
    return await client.db('jamcafe').collection('users')
      .deleteOne({ _id: ObjectId(_id) });
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserByUid = async ({ uid }) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOne({ uid });
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserByUsername = async (username) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOne({ username });
  } catch (err) {
    throw new Error(err);
  }
};

export const getUsers = async () => {
  try {
    return await client.db('jamcafe').collection('users')
      .find().toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (_id, propsToUpdate) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { ...propsToUpdate } });
  } catch (err) {
    throw new Error(err);
  }
};

/* * Posts * */
export const addPost = async (newPost) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .insertOne({
        uid: newPost.uid,
        user: newPost.user,
        title: newPost.title,
        content: newPost.content,
        datePosted: new Date(newPost.datePosted),
      });
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePost = async ({ _id }) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .deleteOne({ _id: ObjectId(_id) });
  } catch (err) {
    throw new Error(err);
  }
};

export const getPosts = async () => {
  try {
    return await client.db('jamcafe').collection('posts')
      .find().toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const getPostsByName = async (user) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .find({ user }).toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePost = async (id, propsToUpdate) => {
  const validPropsToUpdate = { ...propsToUpdate, datePosted: new Date(propsToUpdate.datePosted) };
  try {
    return await client.db('jamcafe').collection('posts')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...validPropsToUpdate } });
  } catch (err) {
    throw new Error(err);
  }
};

/* * Chats * */

// export const addChat = async (newChat) => {
//   try {
//     // TODO: Edit method here to insert correct stucture of a new chat
//     // { _id: (auto), users: [user1, user2], messages: []}
//     return await client.db('jamcafe').collection('chats')
//       .insertOne({});
//   } catch (err) {
//     throw new Error(err);
//   }
// };

export const getChatsByUsername = async (user) => {
  const testName = 'stlnick';
  try {
    // TODO: Edit method here to find a user in an Array in Mongo
    return await client.db('jamcafe').collection('chats')
      .find({ users: testName }).toArray();
  } catch (err) {
    throw new Error(err);
  }
};

// export const updateChat = async (id, propsToUpdate) => {
//   const validPropsToUpdate = { ...propsToUpdate, datePosted: new Date(propsToUpdate.datePosted) };
//   try {
//     return await client.db('jamcafe').collection('chats')
//       .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...validPropsToUpdate } });
//   } catch (err) {
//     throw new Error(err);
//   }
// };
