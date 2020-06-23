<template>
  <tr class="bratenzeile">
    <td>{{braten.beschreibung}}</td>
    <td>{{braten.haltbarbis}}</td>
    <td><StarRating :maxsterne="5" :sterne="braten.vgrad / 25" /></td>
    <td>{{braten.anbieter.vollname}}, {{braten.abholort}}</td>
    <td><a @click="delclicked()"><i class="fa fa-trash" /></a></td>
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
    braten: Object
  },
  setup(props,context) {
    function delclicked(): void {
      const braten = props.braten as Braten;
      context.emit("delete-zeile", braten.id);
    }
    // return props.braten, delclicked;
    return {
      delclicked
    };
  }
});
</script>

<style scoped>
</style>
