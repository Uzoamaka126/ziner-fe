export default {
    install: (app, options) => {
        console.log('app:', app);
        app.config.globalProperties.$api = (key) => {
            return {
                api: {
                    login: {
                        /**
                            * User login
                            * @param {*} $body 
                            * @param {*} $config 
                            * @returns 
                        */
                        post: ($body, $config) => app.$axios.post('/auth/login', $body, $config)
                    },
                    signup: {
                        /**
                            * User signup
                            * @param {*} $body 
                            * @param {*} $config 
                            * @returns 
                        */
                        post: ($body, $config) => app.$axios.$post('/auth/register', $body, $config)
                    }
                }
            }
        }
        app.provide('api', options)
    }
}