# Blogilista backend token-autentikoinnilla ja testaus

Fullstack -kurssin blogilista backend ja UT -tehtävien 4.1 - 4.23* /23 palautus

Tehtävien vaatimukset on kuvattu kurssin sivuilla, https://fullstackopen.com/osa4, alla vapaamuotoinen kuvaus sisällöstä toteutusjärjestyksessä.

- __4a: Sovelluksen rakenne ja testauksen alkeet__
  - Blogilista -backend npm-projektimuotoisena
  - Projekti jaettu moduuleihin
  - Projektiin lisätty verrattuna annettuun index.js:ään hieman debuggausta helpottavia asioita sekä luentomateriaalissa esimekeissä annettuja osioita pienesti paranneltuna, mm. virheenhallintaa, loggausta sekä delete-api, get /:id ja tuntemattomen endpointin käsittely
  - Apufunktioita ja yksikkötestejä, stepit 1-5 (tehtävät 4.3-4.7*),
  dummy, total_likes, favourite_blog, most_bloggers ja most_likes -testit sekä kohdefunktiot
  - blogilista UT: test_help.js lisäys myös edellisen __4a:n__ testidatat
- __4b: Backendin testaaminen__ stepit 1-5 (tehtävät 4.8-4.12*)
  - GET, POST api/blogs testi ja operaatio: async/await -käyttö promisejen sijaan,
    id- attribuutti yksilöintitietona _id sijaan apeilta, default arvo ja olemassaolovaatimus modelissa
- __Blogilistan laajennus__
  - stepit 1-2 (tehtävät 4.13-4.14*) DELETE, PUT ja testit
- __4c-d: Blogilistan laajennus__ käyttäjien hallinta ja tokenperustainen kirjautuminen
  - stepit 3-6 (tehtävät 4.14-4.21*): Käyttäjien  tietokanta, POST ja GET, kredentiaalien validointi sekä testit. Populointi molemmin puolin käyttäjä - blogi välillä.
  - Tokenperustainen autentikointi, login, get (stepit 6-7), delete (steppi 9)
  - Steppi 8 (t4.20* kuten 4.22*) autentikoinnin refaktorointia middlewareiksi
  - Steppi 10 (t.4.22*), userExtractor middleware postille ja deletelle, get pitää pitää tokenitta, testi tokenien puuttumiselle (unauthorized).
  - Edellisien token-laajennusosien rikkomat testit korjattu (steppi 11, t.4.23*)

__KOODI JA TESTIT AJANTASAISESTI YHTENEVÄT, JÄRJESTYKSESSÄ KAIKISSA REPOISSA JA _KAIKKI TEHTÄVÄT OVAT VALMIITA_ (kaikki materiaalissa annetut tehtävät palautettu/tehty lisätehtävineen (*), useasti sopivilta osin häiritsemättömiä osia ennen varsinaista tehtäväkommittia)__
