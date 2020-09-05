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
export const deleteUser = async (id) => {
  try {
    return await client.db('jamcafe').collection('users')
      .deleteOne({ _id: ObjectId(id) });
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

export const updateUser = async (uid, propsToUpdate) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOneAndUpdate({ uid }, { $set: { ...propsToUpdate } });
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

export const deletePost = async (id) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .deleteOne({ _id: ObjectId(id) });
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

export const getPostsById = async (userId) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .find({ userId }).toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePost = async (id, propsToUpdate) => {
  try {
    return await client.db('jamcafe').collection('posts')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...propsToUpdate } });
  } catch (err) {
    throw new Error(err);
  }
};
