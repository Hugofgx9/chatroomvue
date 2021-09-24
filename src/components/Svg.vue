<template>
	<div ref="container"></div>
</template>

<script>
import svgPath from "@/js/svg.js";

export default {
	mounted(){
		new svgPath(this.$refs.container)
	}

}
</script>

<style scoped>

div {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}

</style>