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
  //   },
  //   {
  //     "id": 13, "version": 0, "anbieter": { "loginname": "jogi", "vollname": "Joghurta Biffel", "nutzungsbedingungenok": true },
  //     "abholort": "Am Zipfel 1, 12345 Vollradisroda", "haltbarbis": "2022-11-17",
  //     "beschreibung": "Super leckerer Bratwurstbraten", "vgrad": 25
  //   },
  //   {
  //     "id": 3, "version": 0, "anbieter": { "loginname": "joebi", "vollname": "Joendhard Biffel", "nutzungsbedingungenok": true },
  //     "abholort": "Schneisenbruch 645, 01534 Vollradisroda", "haltbarbis": "2024-12-22",
  //     "beschreibung": "Synthetischer Gummibraten mit Bemmenbröseln", "vgrad": 50
  //   },
  //       {
  //         "id": 6, "version": 0, "anbieter": { "loginname": "mari", "vollname": "Marizzibel", "nutzungsbedingungenok": true },
  //         "abholort": "Bahnhofplatz 8, 20532 Paddelsdorf", "haltbarbis": "2021-03-12",
  //         "beschreibung": "Selbstinspirierter Pilzbraten mit Zuckerguss", "vgrad": 100
  //       },
  //   {
  //     "id": 14, "version": 0, "anbieter": { "loginname": "jogi", "vollname": "Joghurta Biffel", "nutzungsbedingungenok": true },
  //     "abholort": "Am Wackeldackel 21, 12345 Dohanne", "haltbarbis": "2022-09-14",
  //     "beschreibung": "Schwaebischer Schupfnudelbraten mit Erweiterungen", "vgrad": 25
  //   },
  //   {
  //     "id": 5, "version": 0, "anbieter": { "loginname": "joebi", "vollname": "Joendhard Biffel", "nutzungsbedingungenok": true },
  //     "abholort": "Schneisenbruch 648, 01534 Vollradisroda", "haltbarbis": "3017-12-31",
  //     "beschreibung": "Sehr haltbarer Carbon-verstärkter Bratling, trotzdem lecker", "vgrad": 75
  //   },
  //   {
  //     "id": 7, "version": 0, "anbieter": { "loginname": "mari", "vollname": "Marizzibel", "nutzungsbedingungenok": true },
  //     "abholort": "Bahnhofvorplatz 8, 20532 Paddelsdorf", "haltbarbis": "2022-07-16",
  //     "beschreibung": "Magenprüfender therapeutischer Pfostenbraten", "vgrad": 75
  //   },
  //   {
  //     "id": 1, "version": 0, "anbieter": { "loginname": "waldi", "vollname": "Waldemar Wunderlich", "nutzungsbedingungenok": true },
  //     "abholort": "Eckstrasse 42, 54734 Wohlguck", "haltbarbis": "2022-01-07",
  //     "beschreibung": "Bereits genutzter Anbraten", "vgrad": 0
  //   },

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
    console.log("JUHU");
    const tmp: BratenMessage = JSON.parse(message.body);
    if (tmp.operation == "delete") {
      console.log("DELETE");
      for (const i in state.liste) {
        if (state.liste[i].id == tmp.braten.id) {
          state.liste.splice(parseInt(i), 1);
        }
      }
    }
    if (tmp.operation == "change") {
      console.log("CHANGE");
      console.log(state.liste);
      console.log(tmp.braten);
      for (const i in state.liste) {
        if (state.liste[i].id == tmp.braten.id) {
          // TODO: warum gehen manche daten verloren?
          // state.liste[i] = tmp.braten;
          // console.log(state.liste); 
          state.liste[i].abholort = tmp.braten.abholort;
          state.liste[i].beschreibung = tmp.braten.beschreibung;
          state.liste[i].haltbarbis = tmp.braten.haltbarbis;
          state.liste[i].vgrad = tmp.braten.vgrad;
          console.log(state.liste);
        }
      }
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
