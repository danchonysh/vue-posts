export default {
	state: {
		config: {},
		show: false,
	},
	actions: {
		changeModal: (ctx, option) => ctx.commit('changeModal', option),
		showModal: (ctx, value) => ctx.commit('showModal', value)
	},
	mutations: {
		changeModal: (state, { curr, prev }) => {
			switch (curr) {
				case 'news': 
					state.config = {
						title: 'Adding news',
						type: 'news',
						closable: false
					}
					break;
				case 'post':
					state.config = {
						title: 'Adding post',
						type: 'post',
						closable: false
					}
					break;
				case 'warn':
					state.config = {
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
					break;
			}
		},
		showModal: (state, value) => state.show = value
	},
	getters: {
		isVisible: state => state.show,
		getModal: state => state.config
	}
}