<template>
	<button @click="click">
		<i></i>
		<span>Anchors</span>
	</button>
</template>

<script>
import { mapMutations } from 'vuex';
export default {

	methods:{
		click(){
			console.log('click');
			this.toogleAnchors();
		},
		...mapMutations(['toogleAnchors'])
	},

}
</script>

<style lang="scss" scoped>

button {
	@include border();
	cursor: pointer;
  background-color: $elevation1;
}

</style>