<template>
  <div class="overlay" v-show="isOpen" />
  <div class="login" v-show="isOpen">
    <h2 class="h1">Ton profil</h2>
    <form @submit="submitUser">
      <label class="username borderFull">
        <InlineSvg :src="require('@/assets/avatar.svg')" />
        <input
          v-model="username"
          type="text"
          placeholder="Quel est ton nom ?"
        />
      </label>

      <div class="colorContainer">
        <div class="userColor">
          <Round :color="selectedColor" />
          <p>Choisis la couleur de tes textes dans la spline </p>
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
      colors: ["#292929", "#4C4C4C", "#C1C1C1", "#740B07", "#EF130B", "#C23800", "#FF7100", "#FFE400", "#E8A200", "#005510", "#0089A7", "#AF975A", "#00CC00", "#0E0865", "#231FD3", "#00569E", "#00B2FF", "#550069", "#A300BA", "#A75574", "#63300D", "#A0522D", "#AB866D", "#DDDF6D" ],
      selectedColor: "",
      username: "",
      isOpen: true,
    };
  },

  mounted() {
    this.selectedColor = this.colors[0];
  },

  methods: {
    submitUser(e) {
      e.preventDefault();
      if (this.username || !this.username.length === 0)
        this.$socket.emit("setUsername", this.username);
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
.overlay {
  z-index: 3;
  position: fixed;
  inset: 0px;
}
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
      display: flex;
      align-items: center;

      svg {
        fill: $black;
        margin-left: 30px;
        margin-right: 20px;
      }

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
    .button {
      cursor: pointer;
      height: 64px;
      background-color: $black;
      color: $elevation1;
      text-transform: uppercase;
    }
  }

  .borderFull {
    @include border-full();
  }
}
</style>
