import { ObjectId } from 'mongodb';
import client from './client';

export const getUsers = async () => {
  try {
    return await client.db('jamcafe').collection('users')
      .find().toArray();
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserById = async (id) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOne({ _id: ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  }
};

export const addUser = async (newUser) => {
  try {
    return await client.db('jamcafe').collection('users')
      .insertOne(newUser);
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (id, propsToUpdate) => {
  try {
    return await client.db('jamcafe').collection('users')
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { ...propsToUpdate } });
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteUser = async (id) => {
  try {
    return await client.db('jamcafe').collection('users')
      .deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  }
};
