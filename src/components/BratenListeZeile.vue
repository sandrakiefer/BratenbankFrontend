<template>
  <tr class="bratenzeile">
    <td></td>
    <td></td>
    <td><StarRating :maxsterne="5" :sterne="vgrad / 25" /></td>
    <td></td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import StarRating from '@/components/StarRating.vue'
import '@/service/Braten'

export default defineComponent({
  name: "BratenListeZeile",
  components: {
    StarRating
  },
  props: {
    braten: Object,
  },
  setup(props) {
    return props.braten  // Direkt Braten-Objekt zum Füllen des Templates durchreichen
  }
});
</script>

<style scoped>
</style>
