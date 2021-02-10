<template>
	<div class="item-container" @click="show = false">
		<Options
			:show="show"
			@enable-edit="enableEdit()"
			@delete="deletePost(post._id)"
		/>
		<div 
			@dblclick="editing ? $refs.upload.click() : null"
			@click.stop
			:class="{
				'post': true,
				'moved': show
			}"
			:style="image">
			<template v-if="editing">
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
					v-if="editing"
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
import Options from '../../UI/options'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
		Confirmation,
		Options
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
			editing: false,
			newPost: {
				image: null,
				caption: this.post.caption,
			},
			preview: ''
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.post.date)
		}, 60000)
	},
	methods: {
		...mapActions(['deletePost', 'editPost']),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.show = false
			this.editing = true
		},
		cancelEdit() {
			this.editing = false
			this.preview = ''
			this.newPost = {
				image: null,
				caption: this.post.caption
			}
		},
		async getPreview() {
			this.newPost.image = this.$refs.file.files[0]
			const reader = new FileReader()
			reader.readAsDataURL(this.newPost.image)
			reader.onload = e => {
				this.preview = e.target.result
			}
		},
		async confirmEdit() {
			const { image, caption } = this.newPost
			if (image || caption) {
				const data = new FormData()
				data.append('caption', caption)
				data.append('image', image)
				data.append('prev', this.post.image)
				console.log(data)
				await this.editPost({ data, id: this.post._id})
				this.editing = false
				this.preview = ''
				this.newPost = {
					image: null,
					caption: this.post.caption
				}
			}
		}
	},
	computed: {
		image() {
			const image = this.preview 
				? `url(${this.preview})` 
				: `url(${'http://localhost:3000/' + this.post.image})`
			return { backgroundImage: image }
		}
	}
}
</script>