# Blogilista backend

Fullstack -kurssin blogilista backend ja UT -tehtävien 4.1 - 4.13 palautus

- npm-projektimuotoinen backend
- Projekti jaettu moduuleihin
- Projektiin lisätty verrattuna annettuun index.js:ään hieman debuggausta helpottavia asioita sekä luentomateriaalissa esimekeissä annettuja osioita pienesti paranneltuna, mm. virheenhallintaa, loggausta sekä delete-api, get /:id ja tuntemattomen endpointin käsittely
- Apufunktioita ja yksikkötestejä, stepit 1-5 (tehtävät 4.3-4.7*),
  dummy, total_likes, favourite_blog, most_bloggers ja most_likes -testit sekä kohdefunktiot
  - blogilista UT: test_help.js lisäys myös edellisen 4a:n testidatat
- Blogilistan testit: stepit 1-5 (testi 4.8-4.12*)
  - GET, POST api/blogs testi ja operaatio: async/await -käyttö promisejen sijaan,
    id- attribuutti yksilöintitietona _id sijaan apeilta, default arvo ja olemassaolovaatimus modelissa
- Blogilistan laajennus: stepi 1 (testi 4.13) DELETE ja testit
