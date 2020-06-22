<template>
  <div class="bratenliste">
    <button @click="reloadList()">
      <i class="fas fa-sync" />
    </button>
    <input type="text" v-model="suchwort" placeholder="Suchbegriff" />
    <table class="table">
      <thead>
        <th>Beschreibung</th>
        <th>Haltbar bis</th>
        <th>Vegetarizität</th>
        <th>Anbieter / Abholort</th>
      </thead>
      <tbody>
        <BratenListeZeile :braten="br" v-for="br in anzeigeliste" :key="br.id" />
      </tbody>
    </table>
    <div class="message is-danger">{{errormessage}}</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed
} from "@vue/composition-api";

import BratenListeZeile from "@/components/BratenListeZeile.vue";
import { useBraten } from "@/service/BratenStore";

export default defineComponent({
  name: "BratenListe",
  // props: {
  //   von: { type: Number, required: true },
  //   bis: { type: Number, required: true }
  // },
  components: { BratenListeZeile },
  setup() {
    const { liste, update, errormessage } = useBraten();
    // Variable "suchwort" vereinbaren
    const suchwort = ref("");
    // sobald Komponente initialisiert ist, update() zum Füllen der "liste" ausführen
    onMounted(async () => {
      await update();
    });
    // Funktion reloadList() soll auf Button-Druck Liste neu laden
    function reloadList(): void {
      update();
    }
    // Variable "anzeigeliste" soll nur diejenigen Einträge aus "liste" enthalten,
    // die "suchwort" enthalten (Groß-/Kleinschreibung egal) in
    // einem der Felder "beschreibung", "vollname" oder "abholort"
    // Wenn "suchwort" weniger als 3 Zeichen lang ist, soll "anzeigeliste"
    // die ganze Liste enthalten. 
    // Bei Änderungen von "suchwort" muss "anzeigeliste" sich sofort anpassen
    const anzeigeliste = computed( () => {
      const n: number = suchwort.value.length;
      if (n < 3) {
        return liste.value;
      } else {
        return liste.value.filter(e => 
          e.beschreibung.toLowerCase().includes(suchwort.value.toLowerCase()) || 
          e.abholort.toLowerCase().includes(suchwort.value.toLowerCase()) || 
          e.anbieter.vollname.toLowerCase().includes(suchwort.value.toLowerCase())
        );
      }
    });

    return {
      anzeigeliste,
      reloadList,
      errormessage,
      suchwort
    };
  }
});
</script>

<style scoped>
.bratenlistetabelle {
  border: 1px solid #ccc;
}
</style>
