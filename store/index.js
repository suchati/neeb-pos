export const state = () => ({
  loading_dialog: false,
  loading_circular: false,
  snackbar: {
    show: false,
    type: null,
    msg: ''
  }
})

export const mutations = {
  LOADIND_DIALOG (state, data) {
    state.loading_dialog = data
  },
  LOADING_CIRCULAR (state, data) {
    state.loading_circular = data
  },
  SET_SUCCESS (state, msg) {
    state.snackbar = { show: true, type: 'success', msg }
  },
  SET_ERROR (state, msg) {
    state.snackbar = { show: true, type: 'error', msg }
  },
  CLEAR_SNACKBAR (state) {
    state.snackbar = { show: false, type: null, msg: '' }
  }
}

export const getters = {
}

export const actions = {
}
