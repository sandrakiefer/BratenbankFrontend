<template>
    <div>
        <h1 class="title">Braten-Chat</h1>
        <h5>Hier triffst Du die Braten-Community live!</h5>
        <BratChat/>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import BratChat from "@/components/BratChat.vue"
export default Vue.extend({
  name: "App",
  components: {
      BratChat
  }
});
</script>
