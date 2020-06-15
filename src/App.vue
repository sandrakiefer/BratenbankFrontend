<template>
  <section id="app">
    <div class="hero is-primary">
      <div class="hero-body">
        <h1 class="title">Braten deluxe</h1>
        <h2 class="subtitle">... jetzt mit noch mehr Klicken</h2>
      </div>
    </div>

    <div class="block">
      <nav class="navbar">
        <div class="navbar-menu is-active">
          <a href="/home" class="navbar-item">Bratenliste</a>
          <a href="/welt" class="navbar-item">Bratenwelt</a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a href="/logout" class="navbar-item">Logout</a>
          </div>
        </div>
      </nav>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <div class="block">
          <div class="box">
            <h1 class="title">Das aktuelle Angebot</h1>
            <BratenListe/>
          </div>
        </div>
      </div>
      <div class="column">
        <VegetarizitaetsRechner/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import BratenListe from "@/components/BratenListe.vue"
import VegetarizitaetsRechner from "@/components/VegetarizitaetsRechner.vue"

export default Vue.extend({
  name: "App",
  components: {
    BratenListe,
    VegetarizitaetsRechner
  }
});
</script>

<style>
</style>
