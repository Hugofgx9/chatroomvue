<template>
	<form class="sendMessage" @submit="checkMessage">
		<input class="text" v-model="textMessage" type="text" placeholder="Envoyer un message dans la spline"/>
		<input class="button" type="submit" value="Envoyer" />
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
			this.$socket.emit('message', this.textMessage);
			this.textMessage = '';
		}
	}
};
</script>

<style lang="scss" scoped>
.sendMessage {
	.text {
		@include border-full();
	}
}
</style>
