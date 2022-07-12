import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = {
  headers: { Authorization: token }
}

const create = async newBlog => {
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response
  } catch (exception) {
    return exception.response
  }
}

const like = async (blog) => {
  try {
    blog.likes++
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response
  } catch (exception) {
    return exception.response
  }
}

export default { getAll, get, setToken, create, like }