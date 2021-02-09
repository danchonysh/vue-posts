<template>
	<div class="item-container">
		<ul :class="{
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
			:class="{
				'post': true,
				'moved': show
			}"
			:style="image">
			<p class="post__text">{{post.caption}}</p>
			<div class="post__footer">
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
import { mapActions } from 'vuex'

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
			newImage: null,
			title: ''
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.post.date)
		}, 60000)
	},
	methods: {
		...mapActions(['deletePost']),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.show = false
			this.editting = true
		},
		cancelEdit() {
			this.editting = false
			this.newImage = null
			this.title = this.post.title
		}
	},
	computed: {
		image() {
			return {
				backgroundImage: `url(${'http://localhost:3000/' + this.post.image})`
			}
		}
	}
}
</script>