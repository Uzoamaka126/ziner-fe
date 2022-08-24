import axiosPlugin from './axios'

// console.log('axiosPlugin---->', axiosPlugin().defaults);

const api = () => {
    return {
        auth: {
            login: {
                /**
                    * User login
                    * @param {*} $body 
                    * @param {*} $config 
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            token: string,
                            id: string,
                        }> 
                    * }
                    }
                */
                post: ($body, $config) => axiosPlugin().post('/auth/login', $body, $config)
            },
            signup: {
                /**
                    * Register a new user
                    * @param {*} $body 
                    * @param {*} $config 
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            token: string,
                            id: string,
                        }> 
                    * }
                    }
                */
                post: ($body, $config) => axiosPlugin().post('/auth/register', $body, $config)
            },
            getUserProfile: {
                /**
                    * User signup
                    * @param {string} id 
                    * @param {any} $config
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            "_id": string,
                            "is_verified": boolean,
                            "firstName": string,
                            "lastName": string,
                            "email": string,
                            "password": string,
                            "username": string,
                            "createdAt": string,
                        }> 
                    * }
                    }
                */
                get: (id, $config) => axiosPlugin().get(`/users/${id}`, $config)
            },
             updateUserProfile: {
                /**
                    * User signup
                    * @param {string} id 
                    * @param {any} $body 
                    * @param {any} $config
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            "_id": string,
                            "is_verified": boolean,
                            "firstName": string,
                            "lastName": string,
                            "email": string,
                            "password": string,
                            "username": string,
                            "createdAt": string,
                        }> 
                    * }
                    }
                */
                put: (id, $body, $config) => axiosPlugin().put(`/users/${id}`,$body, $config)
            }
        }
    }
}

export default api