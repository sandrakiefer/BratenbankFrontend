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
          <div class="navbar-item">
            <router-link to="/liste">Angebote</router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/chat">Community-Chat</router-link>
          </div>
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
            <router-view/>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="block">
          <VegetarizitaetsRechner/>
        </div>
        <div class="block">
          <BratChat/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import VegetarizitaetsRechner from "@/components/VegetarizitaetsRechner.vue"
import BratChat from "@/components/BratChat.vue"

export default Vue.extend({
  name: "App",
  components: {
    VegetarizitaetsRechner,
    BratChat
  }
});
</script>

<style>
</style>
