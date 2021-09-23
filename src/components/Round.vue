<template>
  <i class="round" :style="{ 
		'background-color': color,
		}">
	</i>
</template>

<script>
export default {
  props: {
		color: {
			type: String
		}, 
		border: {
			type: Boolean,
			default: true
		}
	},

  mounted() {},
};
</script>

<style lang="scss" scoped>
.round {
	width: 40px;
  display: inline-block;
  aspect-ratio: 1;
  background-color: orange;
  border-radius: 50%;
  border: 3px solid $elevation1;
}
</style>
