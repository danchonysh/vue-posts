<template>
    <div class="wrapper">
		<Header />
		<Content />
		<Footer />
		<Modal />
    </div>
</template>

<script>
import './assets/scss/default.scss'

import Header from './assets/layouts/header'
import Content from './assets/layouts/content'
import Footer from './assets/layouts/footer'
import Modal from './assets/components/modal'

export default { components: { Header, Content, Footer, Modal } }	
</script>