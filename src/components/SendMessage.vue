<template>
  <form class="sendMessage" :class={isFocus} @submit="checkMessage">
    <i>
      <InlineSvg :src="require('@/assets/bulle.svg')" />
    </i>
    <input
      class="text"
      ref="textInput"
      v-model="textMessage"
      type="text"
      placeholder="Envoyer un message dans la spline"
    />
    <label class="submit">
      <input class="button" type="submit" value="envoyer" />
      <InlineSvg :src="require('@/assets/arrow.svg')" />
    </label>
  </form>
</template>

<script>
export default {
  name: "SendMessage",
  components: {},
  data() {
    return {
      textMessage: "",
      isFocus: false,
    };
  },
  mounted() {
    this.$refs.textInput.addEventListener("focus", () => (this.isFocus = true));
    this.$refs.textInput.addEventListener(
      "focusout",
      () => (this.isFocus = false)
    );
  },

  methods: {
    checkMessage(e) {
      e.preventDefault();
      if (this.textMessage || !this.textMessage.length === 0)
        this.sendMessage();
    },

    sendMessage() {
      this.$socket.emit("message", this.textMessage);
      this.textMessage = "";
    },
  },
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 79px;

    svg {
      fill: $elevation1;
      width: 24px;
    }
  }

  input.text {
    margin-left: 30px;
    // height: 100%;
  }

  label.submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;

    svg {
      fill: $subtitle;
      width: 24px;
    }

    input {
      display: none;
    }
  }

  &.isFocus {
    label.submit svg {
      fill: $black;
    }
  }
}
</style>
