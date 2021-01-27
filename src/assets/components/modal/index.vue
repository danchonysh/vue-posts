<template>
	<aside 
		:class="{
			'modal' : true,
			'show' : show,
			'hide' : !show
		}" 
		@click="options.closable ? $emit('toggle-modal') : null">
		<div 
			@click.stop
			:class="{
				'modal__window' : true,
				'open' : show,
				'close' : !show
			}"  
			:style="{
				width: options.width || 'min(400px, 90%)'
			}">
			<span 
				v-if="options.closable"
				class="modal__close" 
				@click="$emit('toggle-modal')">&times;</span>
			<h2 class="modal__header">{{options.title}}</h2>
			<div class="modal__content" v-html="options.content">
				
				<div class="warning">
					You must enter title and content.
				</div>
			</div>
			<!-- <div 
				v-if="options.btns"
				class="modal__footer">
				<button 
					v-for="btn in options.btns"
					@click="btn.handler()"
					:class="`modal__button ${btn.type}`"
					:key="btn.text">{{btn.text}}</button>
			</div> -->
			<div class="modal__footer">
				<button 
					class="modal__button ok"
					@click="addNews()">
					Add
				</button>
				<button 
					class="modal__button cancel"
					@click="$emit('toggle-modal')">
					Cancel
				</button>
			</div>
		</div>
	</aside>
</template>

<script>
import './modal.scss'

export default {
	props: {
		options: {
			Type: Object,
			required: true
		},
		show: {
			Type: Boolean,
			required: true
		}
	},
	data() {
		return {
			newArticle: {
				title: '',
				content: ''
			}
		}
	},
	methods: {
		addNews() {
			this.$emit('add-news', this.newArticle)
			this.newArticle = {
				title: '',
				content: ''
			}
		}
	},
	mounted() {
		document.querySelector('.modal').classList.remove('hide')
	}
}
</script>