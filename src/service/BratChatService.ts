// Wir sind noch auf Vue2, daher muss Vue3-Composition-API nachregistriert werden,
// damit reactive(), compute(), ref() und Co funktionieren
//////////////////////////////////////////////////////////////////////////////
import Vue from 'vue'
import CompositionApi from '@vue/composition-api'
Vue.use(CompositionApi)
//////////////////////////////////////////////////////////////////////////////

import { computed, ref } from '@vue/composition-api'
import { Client } from '@stomp/stompjs'

/**************************************************/

const STATE_LISTE = ref(new Array<string>());
const CONNECTION = ref(new Boolean);

let wsurl: string;
let stompclient: Client;

function startChat(): void {
    if (wsurl == undefined && stompclient == undefined) {
        wsurl = "ws://localhost:9090/stompbroker";
        stompclient = new Client({ brokerURL: wsurl });
    }
    stompclient.onWebSocketError = () => {
        console.log("STOP");
        CONNECTION.value = false;
    }
    const DEST = "/topic/bratchat/fromserver";
    stompclient.onConnect = () => {
        CONNECTION.value = true;
        stompclient.subscribe(DEST, (message) => {
            const tmp: string = message.body;
            console.log(STATE_LISTE.value);
            STATE_LISTE.value.splice(0, 0, tmp);
            if (STATE_LISTE.value.length > 20) {
                STATE_LISTE.value.splice(STATE_LISTE.value.length - 1, 1);
            } 
        });
    };
    stompclient.activate();
}

function send(nachricht: string) {
    const DEST = "/topic/bratchat/toserver";
    try {
        stompclient.publish({ destination: DEST, headers: {}, body: nachricht });
    } catch (fehler) {
        console.log("Fehler beim Versenden");
    }
}

export function useBratChatService() {
    const lines = computed( () => STATE_LISTE.value );
    const isConnected = computed( () => CONNECTION.value);

    return {
        lines, isConnected, send, startChat
    }

}