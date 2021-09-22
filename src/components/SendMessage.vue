<template>
	<form class="sendMessage" @submit="checkMessage">
		<input v-model="textMessage" type="text" />
		<input type="submit" value="Envoyer" />
	</form>
</template>

<script>
export default {
	name: 'SendMessage',
	data() {
		return {
			textMessage: ''
		};
	},
	mounted() {
	},

	methods: {
		checkMessage(e) {
			e.preventDefault();
			if (this.textMessage || !this.textMessage.length === 0) this.sendMessage();
		},

		sendMessage() {
			this.$parent.sendMessage(this.textMessage);
			this.textMessage = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.sendMessage {
}
</style>
