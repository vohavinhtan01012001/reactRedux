import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
class Http {
  instance: AxiosInstance

  constructor() {
    // this.instance = axios.create({
    //   baseURL: 'https://localhost:44377/api/',
    //   timeout: 50000
    // })
    this.instance = axios.create({
      baseURL: 'https://localhost:44377/api/',
      timeout: 50000
    })
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      this.setBearerToken(accessToken)
    }
  }

  setBearerToken(token: string) {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeBearerToken() {
    delete this.instance.defaults.headers.common['Authorization']
  }
}

const http = new Http().instance

export default http

// import axios from 'axios'

// const http = axios.create({
//   baseURL: 'http://localhost:5000/api/v1/',
//   headers: {
//     /* 'Content-Type': 'multipart/form-data' */
//   }
// })

// export default http
