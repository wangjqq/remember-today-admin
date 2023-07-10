import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3007'
axios.defaults.timeout = 1000 * 5
axios.defaults.withCredentials = true

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  (error) => {
    const errorMsg = error?.message || 'Request Error'
    message.error(errorMsg)
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === '200') {
      return Promise.resolve(data)
    } else if (data.code === '401') {
      return Promise.reject(response)
    }
    return Promise.reject(response)
  },
  (error) => {
    const { response } = error
    // 处理 HTTP 网络错误
    let message1 = ''
    // HTTP 状态码
    const { status, data } = response
    const { message2 = '' } = data
    switch (status) {
      case 200:
        message1 = message2 ? message2 : '请求参数错误,请联系管理员'
        break
      case 401:
        message1 = message2 ? message2 : '请重新登录'
        break
      case 404:
        message1 = message2 ? message2 : '请求地址错误'
        break
      case 500:
        message1 = message2 ? message2 : '服务器故障'
        break
      default:
        message1 = message2 ? message2 : '网络连接故障'
    }

    message.error(message1)
    return Promise.reject(error)
  }
)

function get(url: string, config?: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { ...config })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function post(url: string, config: AxiosRequestConfig) {
  const { data, ...rest } = config
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, rest)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function patch(url: string, config?: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function put(url: string, config?: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function del(url: string, config?: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export { get, post, patch, put, del }
