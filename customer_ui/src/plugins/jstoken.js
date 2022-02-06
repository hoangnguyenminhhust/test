import jwt from 'jsonwebtoken';
const seccretKey = process.env.VUE_APP_SECRET_KEY;

export async function encodeObject(obj) {
  try {
    const token = await jwt.sign(obj, seccretKey);
    return token
  } catch (error) {
    return error
  }
}

export async function decodeObject(token) {
  try {
    const decode = await jwt.verify(token, seccretKey);
    return decode
  } catch (error) {
    return error
  }
}

