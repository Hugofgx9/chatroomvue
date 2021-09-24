<template>
  <div class="userMenu" :class="{isOpen}" @click="isOpen = !isOpen">
    <InlineSvg :src="require('@/assets/union.svg')" class="union" />
    <div v-show="!isOpen" class="closeMenu">
      <div class="content">
        <div class="rounds">
          <Round
            class="round"
            v-for="user in getOtherUsers.slice(0, 3)"
            :color="user.color"
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
  max-height: 85vh;
  @include border-full;

  .openMenu {
    padding: 30px 110px 0 50px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-rows: auto;

    .connectedWrapper {
      overflow-y: scroll;
    }
  }

  .closeMenu {
    cursor: pointer;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;

    .content {
      display: grid;
      align-items: center;
      width: 100%;
      grid-template-columns: auto auto;
      justify-content: start;
      padding: 0 25px;

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

  .union {
    cursor: pointer;
    position: absolute;
    right: 25px;
    top: 45px;
    color: $black;
    // transform: rotate(0);
    transition: transform 0.4s ease-in-out;
  }

  &.isOpen {
    .union {
      transform: rotate(180deg);
    }
  }
}
</style>
