# Blogilista backend (ongoing, refactoring)

Fullstack -kurssin blogilista backend ja UT -tehtävien 4.1 - 4.20 palautus...

Tehtävien toteutuksen vaatimukset on kuvattu kurssin sivuilla, https://fullstackopen.com/osa4

- Osan palautus muotoutuu vielä ja lisää valmista tulossa, versioissa ylimäärästä kommentointia dokumentaatiomielessä vielä koodin seassa

- npm-projektimuotoinen backend
- Projekti jaettu moduuleihin
- Projektiin lisätty verrattuna annettuun index.js:ään hieman debuggausta helpottavia asioita sekä luentomateriaalissa esimekeissä annettuja osioita pienesti paranneltuna, mm. virheenhallintaa, loggausta sekä delete-api, get /:id ja tuntemattomen endpointin käsittely
- Apufunktioita ja yksikkötestejä, stepit 1-5 (tehtävät 4.3-4.7*),
  dummy, total_likes, favourite_blog, most_bloggers ja most_likes -testit sekä kohdefunktiot
  - blogilista UT: test_help.js lisäys myös edellisen 4a:n testidatat
- Blogilistan testit: stepit 1-5 (tehtävät 4.8-4.12*)
  - GET, POST api/blogs testi ja operaatio: async/await -käyttö promisejen sijaan,
    id- attribuutti yksilöintitietona _id sijaan apeilta, default arvo ja olemassaolovaatimus modelissa
- Blogilistan laajennus: stepit 1-2 (tehtävät 4.13-4.14*) DELETE, PUT ja testit
- __4c-d__: Blogilistan laajennus: stepit 3-6 (tehtävät 4.14-4.20). Käyttäjien tietokanta, POST ja GET, kredentiaalien validointi sekä testit. Populointi molemmin puolin käyttäjä-blogi välillä. Tokenperustainen autentikointi, login, get (stepit 6-7). Steppi 8 (t4.20*) on autentikoinnin refaktorointia middlewareksi.

__KOODI JA TESTIT AJANTASAISESTI YHTENEVÄT, JÄRJESTYKSESSÄ KAIKISSA REPOISSA JA _KAIKKI TEHTÄVÄT OVAT VALMIITA_ (kaikki materiaalissa annetut tehtävät palautettu/tehty, useasti sopivilta osin häiritsemättömiä osia ennen varsinaista tehtäväkommittia)__
