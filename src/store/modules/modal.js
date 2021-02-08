import toLocal from '../../assets/libs/toLocal'

export default {
	state: {
		modalState: JSON.parse(localStorage.getItem('modal-state')) ??
		{
			config: {},
			show: false
		}
	},
	actions: {
		changeModal: ({ commit }, option) => commit('changeModal', option),
		showModal: ({ commit }, value) => commit('showModal', value)
	},
	mutations: {
		changeModal: (state, { curr, prev }) => {
			switch (curr) {
				case 'news': 
					state.modalState.config = {
						title: 'Adding news',
						type: 'news',
						closable: false
					}
					toLocal(state.modalState, 'modal-state')
					break;
				case 'post':
					state.modalState.config = {
						title: 'Adding post',
						type: 'post',
						closable: false
					}
					toLocal(state.modalState, 'modal-state')
					break;
				case 'warn':
					state.modalState.config = {
						title: 'Warning',
						type: 'warn',
						content: `
							<p 	
								class="modal__content-warning">
								Please, fill in the blank!
							</p>`,
						prev,
						closable: false
					}
					toLocal(state.modalState, 'modal-state')
					break;
			}
		},
		showModal: (state, value) => {
			state.modalState.show = value
			toLocal(state.modalState, 'modal-state')
		}
	},
	getters: {
		isVisible: state => state.modalState.show,
		getModal: state => state.modalState.config
	}
}