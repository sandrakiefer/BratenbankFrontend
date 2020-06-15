<template>
  <span class="starrating">
    <a v-for="i in maxsterne" v-bind:key="i" v-on:click="sternGeklickt(i)">
        <i class="fas fa-carrot" v-bind:class="{ 'checked': i <= sternzahl }"/>
    </a>
    &nbsp;
    <span class="zahlen">{{sternzahl}} / {{maxsterne}} ({{prozent}}%)</span>
  </span>
</template>


<script lang="ts">
import { defineComponent, computed, ref } from "@vue/composition-api";

export default defineComponent({
  name: "StarRating",
  props: {
    maxsterne: { type: Number, required: true },
    sterne:    { type: Number, required: true }
  },

  setup(props) {
    const sternzahl = ref(props.sterne)
    const prozent   = computed(() => (sternzahl.value / props.maxsterne) * 100)

    function sternGeklickt(i: number): void {
      if (i >= 0 && i <= props.maxsterne) {
        sternzahl.value = i
      }
    }

    return {
      sternzahl,  prozent,  sternGeklickt
    };
  }
});
</script>


<style scoped>
a {
  color: black;
}
.zahlen {
  color: gray;
}
.checked {
  color: orange;
}
</style>

