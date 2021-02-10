<template>
	<div class="item-container" @click="toggleButtons()">
		<ul 
			@click.stop
			:class="{
				'buttons__list': true,
				'hidden__list': !show
			}">
			<li 
				class="buttons__list-item edit"
				@click="enableEdit()">
				Edit
			</li>
			<li 
				class="buttons__list-item remove"
				@click="deletePost(post._id)">
				Remove
			</li>
		</ul>
		<div 
			@dblclick="editting ? $refs.upload.click() : null"
			@click.stop
			:class="{
				'post': true,
				'moved': show
			}"
			:style="image">
			<template v-if="editting">
				<input @dblclick.stop
					v-model="newPost.caption"
					class="post__text input"
					type="text">
				<label ref="upload" for="upload"></label>
				<input 
					@change="getPreview()"
					type="file" 
					id="upload"
					ref="file"
					style="display: none;"
					accept="image/*">
			</template>
			<p v-else class="post__text">{{post.caption}}</p>
			<div class="post__footer" @dblclick.stop>
				<Confirmation 
					v-if="editting"
					@confirm="confirmEdit()"
					@cancel="cancelEdit()"/>
				<span
					v-else
					class="post__options"
					@click="toggleButtons()">
					&hellip;
				</span>
				<p class="post__time">{{formatted}}</p>
			</div>
		</div>
	</div>
</template>

<script>
import './post.scss'

import formatting from '../../libs/timeFormatting'
import Confirmation from '../../UI/confirmation'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
		Confirmation
	},
	props: {
		post: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			formatted: formatting(this.post.date),
			show: false,
			editting: false,
			newPost: {
				image: '',
				caption: this.post.caption
			}
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.post.date)
		}, 60000)
	},
	methods: {
		...mapActions(['deletePost', 'setPreview', 'editPost', 'deletePreview']),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.show = false
			this.editting = true
		},
		cancelEdit() {
			this.editting = false
			if (this.newPost.image) {
				this.deletePreview({ 
					preview: this.newPost.image,
					id: this.post._id
				})
			}
			this.newPost = {
				caption: this.post.caption,
				image: ''
			}
		},
		async getPreview() {
			const file = this.$refs.file.files[0]
			if (file) {
				const data = new FormData()
				data.append('image', file)
				data.append('prev', this.newPost.image)
				await this.setPreview({ data, id: this.post._id })
				this.newPost.image = this.getPreviews.find(el => el.id === this.post._id).preview
			}
		},
		async confirmEdit() {
			let { image, caption } = this.newPost 
			let prev = this.post.image
			if (!image)  {
				this.newPost.image = this.post.image
				prev = ''
			}
			if (this.newPost.image && caption) {
				await this.editPost({
					body: { ...this.newPost, prev },
					id: this.post._id 
				})
				this.editting = false
				this.newPost = {
					caption: this.post.caption,
					image: ''
				}
			}
		}
	},
	computed: {
		...mapGetters(['getPreviews']),
		image() {
			const image = this.editting && this.newPost.image
				? this.newPost.image
				: this.post.image
			return {
				backgroundImage: `url(${'http://localhost:3000/' + image})`
			}
		}
	}
}
</script>