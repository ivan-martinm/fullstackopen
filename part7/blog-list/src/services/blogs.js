import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  try { 
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response
  } catch (exception) {
    return exception.response
  }
}

const like = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    const response = await axios.put(
      `${baseUrl}/${changedBlog.id}`,
      changedBlog,
      config
    )
    return response
  } catch (exception) {
    return exception.response
  }
}

const remove = async (id) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response
  } catch (exception) {
    return exception.response
  }
}

export default { getAll, get, setToken, create, like, remove }
