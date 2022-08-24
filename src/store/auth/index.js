import api from '../../utils/api/api'
import { myToast } from '../../utils/toast';

export default {
    state: () => {
        return {
            loadingState: false,
            // accessTokenExpireAt: 0,
            isAuthenticated: false,
            authLoginMsg: '',
            authLoginErrMsg: '',
            authSignUpMsg: '',
            authSignUpMsg: '',
            email: '',
            // tokenDuration: 60000 * 30,
        }
    },
    getters: {},
    mutations: {
        setUserAuthState(state, { email, isAuthenticated }) {
            state.isAuthenticated = isAuthenticated;
            state.email = email
        },
    },
    actions: {
        async initLogin(context, { email, password }) {
            try {
                context.state.loadingState = true

                const { message, data: { token } } = await api().auth.login.post({ email, password })

                context.state.authLoginMsg = message
                context.state.email = email
                if (!token) {
                    context.state.loadingState = false
                    context.state.authLoginMsg = 'Invalid or no token!'
                    throw new Error('Invalid or no token!')
                } else {
                    context.state.loadingState = false
                    this.setTokenOnLocalStorage(token)
                    return true
                }
            } catch (error) {
                context.state.loadingState = false
                throw new Error(error)
            }
        },

        setTokenOnLocalStorage(token) {
            localStorage.setItem('siner:access_token', token)
        },

        async initSignup(context, data) {
            context.state.loadingState = true

            try {
                context.state.loadingState = false
                const { email } = data

                const { message, data: { token } } = await api().auth.signup.post(data)

                context.state.authSignUpMsg = message
                context.state.email = email
                if (!token) {
                   throw new Error('Unable to set invalid token!')
                } else {
                    this.setTokenOnLocalStorage(token)
                    return true
                }
            } catch (error) {
                context.state.loadingState = false

                console.log('error--->', error);

                throw new Error(error)
            }
        },
    }
}