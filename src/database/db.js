const sobreviventes = [
  {
    id: 1,
    nome: "junior",
    idade: 35,
    sexo: "masculino",
    localizacaoLat: "12345",
    localizacaoLng: "54321",
    infectado: false,
    reportagem: 0,
    agua: 3,
    comida: 4,
    medicamento: 1,
    municao: 3
  },
  {
    id: 2,
    nome: "vanessa",
    idade: 25,
    sexo: "feminino",
    localizacaoLat: "111111",
    localizacaoLng: "222222",
    infectado: false,
    reportagem: 0,
    agua: 4,
    comida: 5,
    medicamento: 3,
    municao: 2
  }
];

const db = {
  sobreviventes
}

module.exports = { db };