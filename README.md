# Apocalipse Zumbi
Projeto desenvolvido em NodeJs para processo seletivo

## Dependências necessárias

- Node
- yarn ou Npm

## Como rodar em sua máquina
Para que o projeto rode em sua máquina é necessário clonar este projeto, entrar na pasta e executar:

    yarn install
    node src/server.js
   
## funções disponíveis na API
Criar um novo sobrevivente:
```
    mutation{
  createSobrevivente(data: {
    nome: "guilherme",  
    idade: 17, sexo: "masculino",
    localizacaoLat: "12345",
    localizacaoLng: "54321",
    agua: 3,
    comida: 4,
    medicamento: 4,
    municao: 3}
  ){
    id
    nome
    idade
    sexo
    localizacaoLat
    localizacaoLng
    infectado
    reportagem
    agua
    comida
    medicamento
    municao
  }
}
```
Buscar sobreviventes:
```
query{
  sobreviventes{
    id
    nome
    idade
    sexo
    localizacaoLat
    localizacaoLng
    infectado
    reportagem
    agua
    comida
    medicamento
    municao
  }
}
```
Reportar infectado:
```
mutation{
	reportarInfectado(data: {id: "1"}){
    id
  	nome
  	idade
  	sexo
  	infectado
    localizacaoLat
    localizacaoLng
  	agua
 		comida
  	medicamento
  	municao
  }
}
```
atualizar a localizacao:
```
mutation{
	atualizarLocalizacao(data: {id: "2", localizacaoLat: "232323", localizacaoLng: "233333"}){
    id
  	nome
  	idade
  	sexo
  	localizacaoLat
    localizacaoLng
  	infectado
  	agua
 		comida
  	medicamento
  	municao
  }
}
```
fazer trocas entre sobreviventes:
```
mutation{
	trocas(data: {id_1: "1", agua_1: 1, comida_1: 0, medicamento_1: 0, municao_1: 0, id_2: "2", agua_2: 0, comida_2: 0, medicamento_2: 2, municao_2: 0}){
    id
  	nome
  	idade
  	sexo
  	localizacaoLat
    localizacaoLng
  	infectado
  	agua
 		comida
  	medicamento
  	municao
  }
}
```
## Relatorios
Percentual de sobreviventes infectados:
```
query{
	percentualInfectado{
    percentualDeInfectados
    totalInfectados
    totalSobreviventes
  }
}
```
Percentual de sobreviventes não infectados:
```
query{
  percentualNaoInfectado{	
    totalNaoInfectados
  	totalSobreviventes
  	percentualDeNaoInfectados
  }
}
```
Quantidade média de cada tipo de recurso por sobrevivente
```
query{
  mediaDeRecursos{
    agua
  	comida
  	medicamento
  	municao
  }
}
```
Pontos perdidos por causa dos sobreviventes infectados
```
query{
	pontosPerdidos{
    pontos
  }
}
```
