<template>
  <div ref="container"></div>
</template>

<script>
import svgPath from "@/js/svg.js";
import { mapState } from "vuex";

export default {
  mounted() {
    this.svg = new svgPath(this.$refs.container);
    this.$socket.on("message", (message) => this.addMessage(message));
    this.$socket.on("messages", (messages) =>
      messages.forEach((msg) => this.addMessage(msg))
    );

    this.$refs.container.addEventListener("wheel", (e) => this.svg.scroll(e));
  },

  methods: {
    addMessage(message) {
      const user_color =
        this.users.find((a) => a.id === message.user.id)?.color || null;
      this.svg.addMessage(message.value, user_color);
    },
  },

  computed: {
    ...mapState(["users", "anchors"]),
  },

  watch: {
    anchors(newAnchors) {
      this.svg.setAnchorsVisibility(newAnchors);
    },
  },
};
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