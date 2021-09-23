<template>
	<form class="sendMessage" @submit="checkMessage">
		<i></i>
		<input class="text" ref="textInput" v-model="textMessage" type="text" placeholder="Envoyer un message dans la spline"/>
		<input class="button" type="submit" value="Envoyer" />
	</form>
</template>

<script>
export default {
	name: 'SendMessage',
	data() {
		return {
			textMessage: '',
			isFocus: false
		};
	},
	mounted() {
		this.$refs.textInput.addEventListener('focus', () => this.isFocus = true);
		this.$refs.textInput.addEventListener('focusout', () => this.isFocus = false);
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
	@include border();
	display: grid;
	grid-template-columns: auto 1fr auto;
	background-color: $elevation1;

	i {
		background-color: $black;
		width: 79px;
	}

	.text {
		margin-left: 30px;
		// height: 100%;
	}
}
</style>
