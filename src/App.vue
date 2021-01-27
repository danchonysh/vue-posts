<template>
    <div class="wrapper">
		<Header />
		<Content 
			:data="{postsArray, newsArray}"
			@toggle-modal="toggleModal($event)"
		/>
		<Footer />
		<Modal 
			:options="modal"
			:show="showModal"
			@toggle-modal="toggleModal(false)"
		/>
    </div>
</template>

<script>
const toLocal = (data, store) => localStorage.setItem(store, JSON.stringify(data))

import './assets/scss/default.scss'

import Header from './assets/layouts/header'
import Content from './assets/layouts/content'
import Footer from './assets/layouts/footer'
import Modal from './assets/components/modal'

export default {
	components: {
		Header,
		Content,
		Footer,
		Modal
	},
	data() {
		return {
			showModal: false,
			modal: {
				title: 'Test modal',
				closable: true
			},
			newsArray: localStorage.getItem('news') 
				? JSON.parse(localStorage.getItem('news'))  
				: [],
			postsArray: localStorage.getItem('posts') 
				? JSON.parse(localStorage.getItem('posts'))  
				: []
		}
	},
	methods: {
		toggleModal(option) {
			this.modal = option 
				? {
					title: 'Adding post',
					post: true,
					closable: true
				} 
				: {
					title: 'Adding news',
					post: false,
					closable: true
				}
			this.showModal = !this.showModal
		}
	}
}	
</script>
