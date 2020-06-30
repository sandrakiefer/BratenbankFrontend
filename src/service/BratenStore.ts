// Wir sind noch auf Vue2, daher muss Vue3-Composition-API nachregistriert werden,
// damit reactive(), compute(), ref() und Co funktionieren
//////////////////////////////////////////////////////////////////////////////
import Vue from 'vue'
import CompositionApi, { reactive } from '@vue/composition-api'
Vue.use(CompositionApi)
//////////////////////////////////////////////////////////////////////////////

import { computed } from '@vue/composition-api'
import { Client } from '@stomp/stompjs'
import '@/service/Braten'

/**************************************************/

const state = reactive({
  liste: Array<Braten>(),
  errormessage: ""
})

function push(ele: Braten): void {
  state.liste.push(ele)
}

async function update() {
  fetch(`/api/braten`)
    .then( (response) => {
      if(!response.ok) {
        throw new Error('Fehler bei der Serverkommunikation');
      }
      return response.json();
    })
    .then( (jsondata) => {
      state.liste = jsondata;
    })
    .catch( (reason) => {
      state.errormessage = reason;
    });
  // const bratenliste = [
  //   {
  //     "id": 2, "version": 0, "anbieter": { "loginname": "waldi", "vollname": "Waldemar Wunderlich", "nutzungsbedingungenok": true },
  //     "abholort": "Eckstrasse 42, 54734 Wohlguck", "haltbarbis": "2021-09-27",
  //     "beschreibung": "Experimenteller Bratburgerbraten", "vgrad": 100
  //   }
  // ]
  // // bei jedem update() Liste verwuseln, damit man einen Effekt sieht
  // state.liste = bratenliste.sort(() => Math.random()-0.5)
}

async function remove(id: number) {
  fetch(`api/braten/${id}`, { method: 'delete' })
    .then( (response) => {
      if(!response.ok) {
        throw new Error('Fehler bei der Serverkommunikation');
      }
    })
    .catch( (reason) => {
      state.errormessage = reason;
    });
}

const wsurl = "ws://localhost:9090/stompbroker";
const DEST = "/topic/braten";
const stompclient = new Client({ brokerURL: wsurl });
stompclient.onConnect = () => {
  stompclient.subscribe(DEST, (message) => {
    const tmp: BratenMessage = JSON.parse(message.body);
    console.log("BRATEN", tmp.braten);

    let change = false;
    for (const i in state.liste) {
      if (state.liste[i].id == tmp.braten.id) {
        if (tmp.operation == "delete") {
          console.log("DELETE");
          state.liste.splice(parseInt(i), 1);
          change = true;
        } else {
          console.log("CHANGE")
          state.liste.splice(parseInt(i), 1, tmp.braten);
          change = true;
        }
      }
    }
    if (!change) {
      console.log("NEW");
      state.liste.push(tmp.braten);
      change = false;
    } 
  });
};
stompclient.activate();

/*
 * Die exportierte use..()-Funktion gibt gezielten Zugriff auf von außen nutzbare Features
 * Verwendung einfach mit import und Auswahl gewünschter Features, z.B. so:
 * const { liste, update } = useBraten()
 */
export function useBraten() {
  return {
    // computed() zur Erzeugung einer zwar reaktiven, aber read-only-Version der Liste und der Fehlermeldung
    liste: computed(() => state.liste),
    errormessage: computed(() => state.errormessage),
    remove,
    update,
    push
  }
}
