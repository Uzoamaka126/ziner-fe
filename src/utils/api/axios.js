import axios from 'axios'

const axiosPlugin = () => {

  let token = localStorage.getItem('token') || undefined;

  axios.defaults.baseURL = process.env.VUE_BASE_API_URL || 'https://siner-server-app.herokuapp.com/api'
  axios.defaults.headers['Content-Type'] = 'application/json'
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json';
  // Interceptor for Axios Requests
  axios.interceptors.request.use(
    function(req) {
      console.log('Making request to ' + req.url)
      req.headers.common['Authorization'] = token
      return req;
    },
    function (error) {
      const code = parseInt(error.response && error.response.status)
      if (code === 400 || code === 404 || code === 401) {
        redirect('/400')
      }
      return Promise.reject(error);
    }
  )
  // axios.prototype.onError(error => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400 || code === 404 || code === 401) {
  //     redirect('/400')
  //   }
  // })
  return axios
}

export default axiosPlugin