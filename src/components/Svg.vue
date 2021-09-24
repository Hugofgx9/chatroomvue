<template>
	<div ref="container"></div>
</template>

<script>
import svgPath from "@/js/svg.js";

export default {
	mounted(){
		this.svg = new svgPath(this.$refs.container);
    this.$socket.on("message", (message) => {
			this.svg.addMessage(message.value, 'red')
		});

		window.addEventListener( 'wheel', (e) => this.svg.scroll(e))

	}

}
</script>

<style scoped>

div {
	position: fixed;
	overflow: hidden;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}

</style>