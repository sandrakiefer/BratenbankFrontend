interface Anbieter {
  loginname: string;
  vollname: string;
  nutzungsbedingungenok: boolean;
}
interface Braten {
  id: number;
  version: number;
  anbieter: Anbieter;
  abholort: string;
  haltbarbis: string;
  beschreibung: string;
  vgrad: number;
}
