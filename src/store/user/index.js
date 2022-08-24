import api from '../../utils/api/api'

export default {
    state: () => {
        return {
            profileLoading: false,
            updateProfileLoading: false,
            user: null
        }
    },
    getters: {
        getUserInitials (state) {
            if (!state.user) {
                return ''
            }

            const { email, firstName, lastName } = state.user

            if (firstName && lastName) {
                return firstName.substring(0, 1) + lastName.substring(0, 1)
            }

            return email.substring(0, 2)
        },
    },
    mutations: {
        setUserDataState(state, data) {
            state.user = data
        },
        updateUserDataState(state, data) {
            state.user = { ...state.user, ...data }
        },
    },
    actions: {
        async getCustomerProfile({ commit }, id) {
             context.state.profileLoading = true

             try {
                context.state.profileLoading = false

                const { message, data } = await api().auth.getUserProfile(id)

                commit('setUserDataState', data)
            } catch (error) {
                context.state.profileLoading = false
            }

        },
         async updateCustomerProfile({ commit }, userData) {
             context.state.updateProfileLoading = true

             try {
                context.state.updateProfileLoading = false

                const { message, data } = await api().auth.getUserProfile(userData)

                commit('updateUserDataState', data)
            } catch (error) {
                context.state.updateProfileLoading = false
            }

        }
    }
}