<template>
  <div class="userMenu" @click="isOpen = !isOpen">
    <div v-show="!isOpen" class="closeMenu">
      <div class="content">
        <div class="rounds">
          <Round
            class="round"
            color="red"
            v-for="user in getOtherUsers.slice(0, 3)"
            :key="user.id"
          />
        </div>
        <p class="h3">[{{ getOtherUsers.length }} personnes connectées]</p>
      </div>
    </div>

    <div v-show="isOpen" class="openMenu">
      <h3 class="h2">Mon Profil</h3>
      <UserCard v-if="getLogInUser" :user="getLogInUser" />
      <h3 class="h2">{{ getOtherUsers.length }} Spliners connectés</h3>
      <div class="connectedWrapper">
        <ul>
          <li v-for="user in getOtherUsers" :key="user.id">
            <UserCard :user="user" />
            <hr class="separator" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import UserCard from "./UserCard.vue";
import Round from "./Round.vue";

export default {
  components: { UserCard, Round },
  data() {
    return {
      isOpen: false,
    };
  },

  mounted() {},

  computed: {
    ...mapState(["users"]),
    ...mapGetters(["getLogInUser", "getOtherUsers"]),
  },
};
</script>

<style lang="scss" scoped>
.userMenu {
  z-index: 2;
  background-color: $elevation1;
  max-height: 100vh;
  @include border-full;

  .openMenu {
    padding: 35px 110px 35px 50px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-rows: auto;

    .connectedWrapper {
      overflow-y: scroll;
    }
  }

  .closeMenu {
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;

    .content {
      display: grid;
      align-items: center;
      grid-template-columns: auto auto;
      .rounds {
        display: flex;
      }
      .round {
        width: 32px;
        &:not(:first-of-type) {
          margin-left: -10px;
        }
      }
    }
  }
}
</style>
