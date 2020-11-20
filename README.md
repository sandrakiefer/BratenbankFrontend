# Webanwendung Bratenbank - Frontend
Hochschule RheinMain - Medieninformatik - Webbasierte Anwendungen - Sommersemester 2020 <br>
Projekt von **Sandra Kiefer** (bei Prof. Dr. Wolfgang Weitz)

![Beispielbild der Backend Webanwendung](src/main/assets/beispiel.png)

## Installation und Startanweisungen
```sh
$ git clone https://github.com/sandrakiefer/BratenbankFrontend.git
$ npm install (Verwendete Packete = @vue/composition-api, @fortawesome/fontawesome-free, bulma, @stomp/stompjs)
$ npm run serve
```
Klonen Sie das Projekt in ein beliebiges Verzeichnis von Ihnen, bauen Sie das Projekt und starten Sie es mit dem Packetmanager npm.
Die Anwendung läuft dann zu Testzwecken auf ihrem Localhost unter Port 8080 (aufzurufen unter http://localhost:8080/). <br>
Damit die Webanwendung auf die Daten aus dem Backend zugreifen kann folgen Sie bitte den Anweisungen im Repository [BratenbankBackend](https://github.com/sandrakiefer/BratenbankBackend.git) und haben diese während der Verwendung des Frontends am laufen.

### Übersicht der Pfade und deren Funktionalität
* **/liste** Echtzeit Übersicht der momentan angebotenen Braten
* **/chat** Öffentlicher Community Chat zum Austausch mit anderen Anwendern

## Projektbeschreibung
> In der aktuellen Situation ist gegenseitige Unterstützung besonders wichtig, unabhängig davon ist die Vermeidung von Verschwendung ein laufendes Anliegen. 
> Informationssysteme können dabei helfen.

Die Bratenbank ist eine Plattform, auf der Benutzer übrig gebliebenen Braten anbieten, und andere Benutzer danach suchen können. <br>
Dieses Repository beinhaltet das Frontend, welches sich um das Anzeigen der Daten aus dem Backend kümmert. Verwendet wird dafür die REST-Schnittstelle. Bei Änderungen im Backend aktualisiert sich automatisch das Frontend. Außerdem steht den Benutzern ein Community Chat zum gemeinsamen Austausch, eine Suchfunktion und ein Vegetarizitätsrechner zur Verfügung.

## Demonstrationsvideo
Ein kurzes Demonstrationsvideo finden Sie unter **demovideo.mp4** im Repository oder unter [Link zu YouTube](https://youtu.be/gw9xml53MEk)
