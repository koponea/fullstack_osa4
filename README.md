# Repositorio fullstack_osa4

Tämä repositorio sisältää kurssin osan 4 tehtävien palautuksen (4.X) Tehtävien toteutuksen vaatimukset on kuvattu kurssin sivuilla, https://fullstackopen.com/osa4

## Palautusrepositoriot, vapaa kuvaus tehtävistä

### fullstack_osa1

- Kurssitiedot (stepit 1-5)
- Unicafe
- Anekdootit

### fullstack_osa2

- Kurssitiedot (stepit 6-9 ja moduuli -erotustehtävä)
- Puhelinluettelo (stepit 1-12)
- Maidentiedot (stepit 1-3)

### fullstack_osa3

- Puhelinluettelon front- ja backend, stepit 1-12,
  mongodb personApp ja mongoose (tehtävä 3.12),
- Puhelinluettelo ja tietokanta: stepit 1-8 (tehtävät 3.13-20),
  fe käyttää be:ä ja databasea, virheidenkäsittely, duplikaatit,
  hae yksittäinen entry, /info, validointivirheet fe:hen.
- Viedään tietokantaa käyttävä sovellus nettiin (tehtävä 3.21)
- Eslint konfigurointi (tehtävä 3.22)
- Tämän osan Puhelinluettelo-appin backend production-frontendilla on Renderissä (ei käynnissä yleensä aikalaskutuksen vuoksi), url: '<https://fullstack-osa3-u4wc.onrender.com>'

### fullstack_osa4 (ongoing, refactoring)

#### 4a projektin rakenne ja testauksen alkeet

- Blogilista backend, step 1 (tehtävä 4.1),
  annetun index.js:n muuttaminen npm-projektiksi.
  Sisältää mongodb-urlin sisältävän env-muuttujan käyttöönoton.
  Ei sisällä apien muuttamisia eikä BE-virheenkäsitelyn lisäämistä tms.
- Blogilista backend, step 2 (tehtävä 4.2),
  Blogilistan backendin modulointi ja täydennetty myös virheenhallintaa, loggausta ja apikäsittelyä
- Apufunktioita ja yksikkötestejä, stepit 1-5 (tehtävät 4.3-4.7*),
  dummy, total_likes, favourite_blog, most_bloggers ja most_likes -testit sekä kohdefunktiot

#### 4b backendin testaaminen

- blogilista UT: test_help.js lisäys myös 4a:n testidatat
- blogilistan testit, stepit 1-5 (testi 4.8-4.12*) GET, POST ja 'id' attribuutti,
  default arvo ja olemassaolovaatimus modelissa
- blogilistan laajennus: stepit 1-2 (testit 4.13-4.14*) DELETE, PUT ja testit

#### 4c ja d käyttäjien hallinta ja tokenperustainen kirjautuminen

- Blogilistan laajennus: stepit 3-7 (testit 4.15-4.19).
  Käyttäjien tietokanta, POST ja GET sekä testit
  Käyttäjän kredentiaalien validointi ja testit
  Populoidaan käyttäjän tiedot blogiin ja blogin käyttäjään
  tokenperustainen autentikointi login ja post
- FIXME & TODO debt: ... tehtäviä tulossa ... versioissa esim ylimäärästä kommentointia dokumentaatiomielessä vielä koodin seassa ja muotoilua ja refaktorointia lisättävä

__KOODI JA TESTIT AJANTASAISESTI YHTENEVÄT, JÄRJESTYKSESSÄ KAIKISSA REPOISSA JA _KAIKKI TEHTÄVÄT OVAT VALMIITA_ (kaikki materiaalissa annetut tehtävät palautettu/tehty)__
