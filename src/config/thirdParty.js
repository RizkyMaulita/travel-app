import axios from 'axios'
const { REACT_APP_CLOUD_NAME_CLOUDINARY } = process.env

export const Cloudinary = () => {
  return axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`,
    headers: {
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data'
    }
  })
}