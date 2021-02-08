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
				@click="deleteNews(news._id)">
				Remove
			</li>
		</ul>
		<section
			:class="{
				'article': true,
				'moved': show
			}">
			<template v-if="editting">
				<input 
					v-model="edittedArticle.title"
					class="article__title input"
					type="text">
				<textarea 
					v-model="edittedArticle.article"
					:style="prevHeight"
					class="article__content input">
				</textarea>
			</template>
			<template v-else>
				<h3 class="article__title">{{news.title}}</h3>
				<p ref="content" class="article__content">{{news.article}}</p>
			</template>
			<div class="article__footer">
				<div class="confirm" v-if="editting">
					<span
						class="article__confirm"
						@click="confirmEdit()">
						OK
					</span>
					<span
						class="article__confirm"
						@click="cancelEdit()">
						Cancel
					</span>
				</div>
				<span 
					v-else
					class="article__options" 
					@click="toggleButtons()">
					&hellip;
				</span>
				<p class="article__time">{{editting ? 'editting' : formatted}}</p>
			</div>
		</section>
	</div>
</template>

<script>
import './news.scss'

import formatting from '../../libs/timeFormatting'
import { mapActions } from 'vuex'

export default {
	props: {
		news: {
			Type: Object,
			required: true
		}
	},
	data() {
		return {
			formatted: formatting(this.news.date),
			show: false,
			editting: false,
			prevHeight: null,
			edittedArticle: {
				title: this.news.title,
				article: this.news.article
			}
		}
	},
	mounted() {
		setInterval(() => {
			this.formatted = formatting(this.news.date)
		}, 60000)
	},
	methods: {
		...mapActions(['deleteNews', 'editNews']),
		toggleButtons() {
			this.show = !this.show
		},
		enableEdit() {
			this.show = false
			this.editting = true
			this.prevHeight = {
				height: this.$refs.content.offsetHeight + 'px'
			}
		},
		cancelEdit() {
			this.editting = false
			this.edittedArticle = {
				title: this.news.title,
				article: this.news.article
			}
		},
		confirmEdit() {
			const { title, article } = this.edittedArticle
			if (title && article) {
				this.editNews({
					id: this.news._id,
					body: {
						title,
						article,
						date: new Date(Date.now()).toLocaleString()
					}
				})
			}
			this.editting = false
		}
	}
}
</script>