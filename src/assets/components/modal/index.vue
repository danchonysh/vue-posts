<template>
	<aside 
		:class="{
			'modal' : true,
			'show' : isVisible,
			'hide' : !isVisible
		}" 
		@click="getModal.closable ? showModal(false) : null">
		<div 
			@click.stop
			:class="{
				'modal__window' : true,
				'open' : isVisible,
				'close' : !isVisible
			}"  
			:style="{
				width: getModal.width || 'min(400px, 90%)'
			}">
			<span 
				v-if="getModal.closable"
				class="modal__close" 
				@click="showModal(false)">&times;</span>
			<h2 class="modal__header">{{getModal.title}}</h2>
			<div class="modal__content">
				<form 
					@submit.prevent="submit()"
					ref="form"
					v-if="getModal.type === 'post'" 
					class="new-post" 
					enctype="multipart/form-data">
					<input 
						@change="fileHandler()"
						ref="file"
						name="image"
						class="new-post__photo" 
						id="file" 
						type="file" 
						accept="image/*">
					<label 
						for="file" 
						class="upload">
						{{ text }}
					</label>
					<textarea 
						v-model="newPost.caption"
						maxlength="194"
						name="caption" 
						class="new-post__content" 
						type="text" 
						placeholder="Write something">
					</textarea>
				</form>
				<form 
					@submit.prevent=""
					v-if="getModal.type === 'news'"
					class="new-aritcle">
					<input
						v-model="newArticle.title"
						name="title" 
						class="new-article__title" 
						type="text" 
						placeholder="Title">
					<textarea 
						v-model="newArticle.article"
						name="article" 
						class="new-article__content" 
						type="text" 
						placeholder="Article">
					</textarea>
				</form>
				<div v-html="getModal.content"></div>
			</div>
			<div class="modal__footer">
				<button
					class="modal__button ok"
					@click="handler()">
					{{ getModal.type === 'warn' ? 'OK' : 'Add' }}
				</button>
				<button 
					v-if="getModal.type !== 'warn'"
					class="modal__button cancel"
					@click="showModal(false)">
					Cancel
				</button>
			</div>
		</div>
	</aside>
</template>

<script>
import './modal.scss'

import { mapGetters, mapActions } from 'vuex'

const defaultText = 'Choose a file'

export default {
	computed: mapGetters(['isVisible', 'getModal']),
	data() {
		return {
			newArticle: {
				title: '',
				article: ''
			},
			newPost: {
				caption: '',
				image: ''
			},
			text: defaultText,
		}
	},
	methods: {
		...mapActions(['showModal', 'addNews', 'addPost', 'changeModal']),
		fileHandler() {
			const image = this.$refs.file.files[0]
			this.newPost.image = image
			const fileName = image.name
			this.text = fileName.length > 12 
				? fileName.slice(0,12) + '...'
				: fileName
		},
		smoothChange(curr, prev = 'news') {
			this.showModal(false)
			setTimeout(() => {
				this.changeModal({ curr, prev })
				this.showModal(true)
			}, 300)
		},
		handler() {
			const type = this.getModal.type
			if (type === 'news') {
				const title = this.newArticle.title.trim()
				const article = this.newArticle.article.trim()
				if (title && article) {
					this.showModal(false)
					this.addNews({
						title,
						article,
						date: new Date(Date.now()).toLocaleString()
					})
					this.newArticle = {
						title: '',
						article: ''
					}
				} else {
					this.smoothChange('warn', 'news')
				}
			}
			if (type === 'post') {
				const { caption, image } = this.newPost
				if (caption.trim() && image) {
					this.showModal(false)
					const formData = new FormData()
					formData.append('image', image)
					formData.append('caption', caption)
					this.addPost(formData)
					this.newPost = {
						caption: '',
						image: ''
					}
					setTimeout(() => this.text = defaultText, 500)
				} else {
					this.smoothChange('warn', 'post')
				}
			}
			if (type === 'warn') {
				console.log(this.getModal.prev)
				this.smoothChange(this.getModal.prev)
			}
		}
	},
	mounted() {
		document.querySelector('.modal').classList.remove('hide')
	}
} 
</script>