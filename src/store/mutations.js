export default {
    createNewWorkspace(state, data) {
        state.workspaces = [...state.workspaces, data]
    },
    showCreateWorkspaceModal(state, booleanValue) {
        state.showCreateWorkspaceModal = booleanValue
    },
    addSingleWorkspaceDetails(state, data) {
        state.workspace = data
    },
}