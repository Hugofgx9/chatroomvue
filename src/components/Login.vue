<template>
  <div class="login" v-show="isOpen">
    <h2>Ton profil</h2>
    <form @submit="submitUser">
      <input
        class="username borderFull"
        v-model="username"
        type="text"
        placeholder="Quel est ton nom ?"
      />

      <div class="colorContainer">
        <div class="userColor">
          <Round :color="selectedColor" />
          <p>Choisis ta couleur</p>
        </div>

        <fieldset>
          <div class="radioItem" v-for="(color, i) in colors" :key="i">
            <input
              @change="onChange($event)"
              :value="color"
              :id="`radio${i}`"
              name="selectColor"
              type="radio"
              :checked="i === 0"
            />
            <label :for="`radio${i}`" :style="{ 'background-color': color }" />
          </div>
        </fieldset>
      </div>

      <input class="button" type="submit" value="Continuer" />
    </form>
  </div>
</template>

<script>
import Round from "./Round.vue";

export default {
  components: { Round },
  data() {
    return {
      colors: ["lightblue", "lightgreen", "goldenrod"],
      selectedColor: "",
      username: "",
      isOpen: true,
    };
  },

  mounted() {
    this.colors = [
      ...this.colors,
      ...this.colors,
      ...this.colors,
      ...this.colors,
      ...this.colors,
      ...this.colors,
    ];
    this.selectedColor = this.colors[0];
  },

  methods: {
    submitUser(e) {
      e.preventDefault();
      if (this.username || !this.username.length === 0) this.$socket.emit('setUsername', this.username);
      this.isOpen = false;
    },
    onChange(event) {
      this.selectedColor = event.target.value;
      //v-model dont work
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  @include border-full();
  z-index: 3;
  position: fixed;
  top: 15vh;
  left: 15vw;
  right: 15vw;
  padding: 35px;
  background-color: $elevation1;

  h2 {
    text-align: center;
    margin-bottom: 25px;
  }

  form {
    display: grid;
    grid-row-gap: 35px;

    .username {
      height: 64px;
      padding-left: 30px;
    }

    .colorContainer {
      @include border-full();
      padding: 25px 38px;

      .userColor {
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: start;
        margin-bottom: 30px;

        .round {
          border: none;
          margin-right: 15px;
        }
      }

      fieldset {
        display: grid;
        grid-auto-rows: auto;
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        grid-gap: 20px;
        justify-items: center;
      }

      .radioItem {
        display: inline-block;
      }

      label {
        display: inline-block;
        cursor: pointer;
        width: 40px;
        aspect-ratio: 1;
        position: relative;

        &:after {
          content: "";
          display: block;
          position: absolute;
          z-index: -1;
        }
      }
      input {
        display: none;

        &:checked ~ label:after {
          inset: -4px;
          background-color: $black;
        }
      }
    }
  }

  .borderFull {
    @include border-full();
  }
}
</style>
