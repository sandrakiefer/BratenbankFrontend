<template>
    <div>
        <input type="text" v-model="eingabe" />
        <button @click="absenden()">abschicken</button>
        {{status}}
        <ul>
            <li v-for="l in anzeigeListe" :key="l">{{l}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "@vue/composition-api";
import { useBratChatService } from "@/service/BratChatService";

export default defineComponent({
    name: "BratChat",
    setup() {
        const { lines, send, startChat, isConnected } = useBratChatService();
        const eingabe = ref("");
        const status = computed( () => {
            if (isConnected.value) {
                return "Server verbunden";
            } else {
                return "keine Verbindung";
            }
        });
        onMounted(async () => {
            await startChat();
        });
        function absenden(): void {
            send(eingabe.value);
            eingabe.value = ("");
        }
        const anzeigeListe = computed( () => {
            return lines.value;
        });
        return {
            absenden,
            anzeigeListe,
            eingabe,
            status
        }
    }
    
});

</script>

<style scoped>
</style>
