<template>
    <div>
        <h1 class="title">Das aktuelle Angebot</h1>
        <BratenListe/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import BratenListe from "@/components/BratenListe.vue"
export default Vue.extend({
  name: "App",
  components: {
      BratenListe
  }
});
</script>
