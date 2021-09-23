<template>
  <div class="userCard">
    <Round class="round" color="lightblue" />
    <div class="userInfo">
      <span class="username">{{ user.name }}</span>
      <span class="subtitle">Connecté(e) depuis 15h00</span>
    </div>
  </div>
</template>

<script>
import Round from "./Round.vue";

export default {
  props: ["user"],
  components: { Round },
};
</script>

<style lang="scss" scoped>
.userCard {
  padding: 15px 31px 15px 0;
  display: grid;
  grid-template-columns: auto auto;

  .userInfo {
    display: grid;

    .subtitle {
      font-size: 18px;
    }
  }

  .round {
		margin: 0px 15px;
    height: 100%;
    width: auto;
    align-self: center;
    justify-self: center;
  }
}
</style>
