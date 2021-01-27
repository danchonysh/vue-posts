<template>
    <div class="wrapper">
		<Header />
		<Content 
			:data="{postsArray, newsArray}"
			@toggle-modal="toggleModal($event)"
			@delete-news="deleteNews($event)"
		/>
		<Footer />
		<Modal 
			:options="modal"
			:show="showModal"
			@toggle-modal="toggleModal(false)"
			@add-news="addNews($event)"
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
			newsArray: localStorage.getItem('news') 
				? JSON.parse(localStorage.getItem('news'))  
				: [],
			postsArray: localStorage.getItem('posts') 
				? JSON.parse(localStorage.getItem('posts'))  
				: [],
			option: 'news'
		}
	},
	methods: {
		toggleModal(option) {
			this. option = option 
			this.showModal = !this.showModal
		},
		addNews(data) {
			const {title, content} = data
			if (title.trim() !== '' && content.trim() !== '') {
				this.showModal = !this.showModal
				this.newsArray.push({
					title,
					content,
					id: Date.now()
				})
				toLocal(this.newsArray, 'news')
			} else {
				this.option = 'warning'
			}
		},
		deleteNews(id) {
			this.newsArray = this.newsArray.filter(el => el.id !== id)
			toLocal(this.newsArray, 'news')
		}
	},
	computed: {
		modal() {
			switch (this.option) { 
				case 0: 
					return {
						title: 'Adding news',
						type: 'news',
						closable: false,
						content: `
							<form 
								onsubmit="e => e.preventDefault()"
								v-if="options.type === 'news'" class="new-aritcle">
								<input
									v-model="newArticle.title"
									name="title" 
									class="new-article__title" 
									type="text" 
									placeholder="Title">
								<textarea 
									v-model="newArticle.content"
									name="article" 
									class="new-article__content" 
									type="text" 
									placeholder="Article">
								</textarea>
							</form>
						`,
						/*btns: [
							{
								type: 'ok',
								text: 'Add',
								handler() {
									this.$emit('add-news', this.newArticle)
									this.newArticle = {
										title: '',
										content: ''
									}
								}
							},
							{
								type: 'cancel',
								text: 'Cancel',
								handler() {

								} 
							}
						]*/
					}
				case 1: 
						return {
						title: 'Adding post',
						type: 'post',
						content: `
							<form 
								@submit.prevent=""
								v-if="options.type === 'post'" 
								class="new-post" 
								enctype="multipart/form-data"
								method="post">
								<input 
									class="new-post__photo" 
									id="file" 
									type="file" 
									accept="image/*">
								<label 
									for="file" 
									class="upload">
									Choose a file
								</label>
								<textarea 
									name="article" 
									class="new-post__content" 
									type="text" 
									placeholder="Write something">
								</textarea>
							</form>
						`,
						closable: false
					}
				default: 
					return {
						title: 'Adding news',
						type: 'warning',
						closable: true
					}
			}
		}
	}
}	
</script>
