<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle ref="M1" :config="{ x: 10, y: 10, ...configCircle }" />
      <v-circle ref="C1_1" :config="{ x: 100, y: 50, ...configCircle }" />
      <v-circle ref="C1_2" :config="{ x: 100, y: 50, ...configCircle }" />
      <v-circle ref="C1_3" :config="{ x: 200, y: 10, ...configCircle }" />
      <v-circle ref="C2_1" :config="{ x: 170, y: 100, ...configCircle }" />
      <v-circle ref="C2_2" :config="{ x: 200, y: 90, ...configCircle }" />
      <v-circle ref="C2_3" :config="{ x: 300, y: 100, ...configCircle }" />
      <v-text-path ref="path" :config="configPath"/>
      <!-- <v-text :config="{text: 'Some text on canvas', fontSize: 15}"/> -->
    </v-layer>
  </v-stage>
</template>

<script>
export default {
  data() {
    return {
      path: "M10 10 C 100 50, 100 50, 200 10 C 170 100, 200 90, 300 100",
      configKonva: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      configCircle: {
        radius: 20,
        fill: "lightblue",
        draggable: true,
      },
      configPath: {
        fill: "#333",
        fontSize: 16,
        fontFamily: "Arial",
				text: "All the world's a stage, and all the men and women merely players.",
        data: "M10 10 C 100 50, 100 50, 200 10 C 170 100, 200 90, 300 100",
        // stroke: "black",
        // strokeWidth: 0.5,
      },
    };
  },

  mounted() {
    this.pathNode = this.$refs.path.getNode();
    this.M1 = this.$refs.M1.getNode();
    this.C1_1 = this.$refs.C1_1.getNode();
    this.C1_2 = this.$refs.C1_2.getNode();
    this.C1_3 = this.$refs.C1_3.getNode();
    this.C2_1 = this.$refs.C2_1.getNode();
    this.C2_2 = this.$refs.C2_2.getNode();
    this.C2_3 = this.$refs.C2_3.getNode();

		console.log( this.pathNode );

    window.addEventListener("mousemove", () => this.move());
		setInterval(() => {
			const text = this.pathNode.getText();
			this.pathNode.setText( ` ${text}`)
			// console.log( this.pathNode.getTextWidth());
		}, 100);
  },
  methods: {
    move() {
      this.pathNode.setData(`
				M	${this.M1.attrs.x} ${this.M1.attrs.y} 
				C ${this.C1_1.attrs.x} ${this.C1_1.attrs.y}, ${this.C1_2.attrs.x} ${this.C1_2.attrs.y}, ${this.C1_3.attrs.x} ${this.C1_3.attrs.y}
				C ${this.C2_1.attrs.x} ${this.C2_1.attrs.y}, ${this.C2_2.attrs.x} ${this.C2_2.attrs.y}, ${this.C2_3.attrs.x} ${this.C2_3.attrs.y}`);
    },
  },
};
</script>

<style>
</style>