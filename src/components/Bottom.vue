<template>
	<div class="bottom" :class="{'isFocus':isFocus}">
		<SplineTypeButton v-show="!isFocus"/>
		<SendMessage ref="sendMessage"/>
	</div>
</template>

<script>
import SendMessage from './SendMessage.vue';
import SplineTypeButton from './SplineTypeButton.vue';

export default {
	name: 'Bottom',
	components: { SendMessage, SplineTypeButton },
	data() {
		return{
			isFocus: false,
		}
	},

	mounted(){
		this.$watch(() => this.$refs.sendMessage.isFocus, (value) => { this.isFocus = value;})
	}

	// computed:{
	// 	isFocus () {
	// 		console.log(this.$refs.sendMessage.isFocus)
	// 		return this.$refs.sendMessage.isFocus;
	// 	}
	// },
};
</script>

<style lang="scss" scoped>
.bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 20px 20px 20px;
	height: 64px;
	display: grid;
	grid-template-columns: 1fr 7fr;
	grid-column-gap: 18px;

	&.isFocus{
		grid-template-columns: 1fr;
	}

}
</style>
