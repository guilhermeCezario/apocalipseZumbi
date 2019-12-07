const uuidv4 = require('uuid/v4');
const { db } = require('./database/db');

module.exports = {
  Query: {
    sobreviventes:() =>{
      arraySobreviventes = db.sobreviventes.filter((sobre)=>{
        return sobre.infectado == false;
      });
      return arraySobreviventes;
    },
    percentualInfectado:() =>{
      let totalInfectados = 0;
      let totalSobreviventes = db.sobreviventes.length;
      db.sobreviventes.map((sob)=>{
        if(sob.infectado == true){
          totalInfectados += 1;
        }
      });
      let percentualDeInfectados = (100/totalSobreviventes)*totalInfectados;

      let info = {
        totalInfectados,
        totalSobreviventes,
        percentualDeInfectados
      };

      return info;
    },
    percentualNaoInfectado:() =>{
      let totalNaoInfectados = 0;
      let totalSobreviventes = db.sobreviventes.length;
      db.sobreviventes.map((sob)=>{
        if(sob.infectado == false){
          totalNaoInfectados += 1;
        }
      });
      let percentualDeNaoInfectados = (100/totalSobreviventes)*totalNaoInfectados;

      let info = {
        totalNaoInfectados,
        totalSobreviventes,
        percentualDeNaoInfectados
      };

      return info;
    },
    mediaDeRecursos: ()=>{
      let totalSobreviventes = 0;
      const medias = {
        agua: 0,
        comida: 0,
        medicamento: 0,
        municao: 0
      }
      db.sobreviventes.map((sob)=>{
        if(sob.infectado == false){
          totalSobreviventes += 1;
          medias.agua += sob.agua;
          medias.comida += sob.comida;
          medias.medicamento += sob.medicamento;
          medias.municao += sob.municao;
        }
      });

        medias.agua /= totalSobreviventes;
        medias.comida /= totalSobreviventes;
        medias.medicamento /= totalSobreviventes;
        medias.municao /= totalSobreviventes;

        return medias;
    },
    pontosPerdidos: ()=>{
      let pontos = 0;

      db.sobreviventes.map((sob)=>{
        if(sob.infectado == true){
          pontos += (sob.agua * 4) + (sob.comida * 4) + (sob.medicamento * 2 ) + sob.municao;
        }
      });

      return { pontos };
    }
  },
  Mutation: {
    createSobrevivente : (parent, args) => {
      let { data } = args;
      
      const sobrevivente = {
        id: uuidv4(),
        nome: data.nome,
        idade: data.idade,
        sexo: data.sexo,
        localizacaoLat: data.localizacaoLat,
        localizacaoLng: data.localizacaoLng,
        infectado: false,
        reportagem: 0,
        agua: data.agua,
        comida: data.comida,
        medicamento: data.medicamento,
        municao: data.municao
      }
      db.sobreviventes.push(sobrevivente);

      return sobrevivente;
    },
    reportarInfectado: (parent, args) =>{
      const { data } = args;

      const sobrevivente = db.sobreviventes.find((sob)=>{
        return sob.id == data.id;
      });

      if(!sobrevivente){
        throw new Error('Esse sobrevivente não existe');
      }else{
        sobrevivente.reportagem += 1;

        if(sobrevivente.reportagem == 3){
          sobrevivente.infectado = true;
        }
      }

      return sobrevivente;
    },
    atualizarLocalizacao(parent, args){
      const { data } = args;
      
      const sobrevivente = db.sobreviventes.find((sob)=>{
        return sob.id == data.id;
      });

      if(!sobrevivente){
        throw new Error('Esse sobrevivente não existe');
      }else{
        sobrevivente.localizacaoLat = data.localizacaoLat;
        sobrevivente.localizacaoLng = data.localizacaoLng;
        return sobrevivente;
      }
    },
    trocas(parent, args){
      const { data } = args;
      let pontos_1 = 0;
      let pontos_2 = 0;

      const sobrevivente_1 = db.sobreviventes.find((sob)=>{
        return sob.id == data.id_1;
      });
      const sobrevivente_2 = db.sobreviventes.find((sob)=>{
        return sob.id == data.id_2;
      });

      if(!sobrevivente_1 || !sobrevivente_2){
        throw new Error('Um dos sobreviventes não existe');
      }else{
        if(sobrevivente_1.infectado == true || sobrevivente_2.infectado == true){
            throw new Error('Um dos sobreviventes está infectado');
        }else{
          if(data.agua_1 <= sobrevivente_1.agua && data.comida_1 <= sobrevivente_1.comida && data.medicamento_1 <= sobrevivente_1.medicamento && data.municao_1 <= sobrevivente_1.medicamento){
            pontos_1 = (data.agua_1 * 4) + (data.comida_1 * 3) + (data.medicamento_1 * 2) + data.municao_1;
          }else{
            throw new Error('recursos não disponivel no inventario');
          }
          if(data.agua_2 <= sobrevivente_2.agua && data.comida_2 <= sobrevivente_2.comida && data.medicamento_2 <= sobrevivente_2.medicamento && data.municao_2 <= sobrevivente_2.medicamento){
            pontos_2 = (data.agua_2 * 4) + (data.comida_2 * 3) + (data.medicamento_2 * 2) + data.municao_2;
          }else{
            throw new Error('recursos não disponivel no inventario');
          }

          if(pontos_1 == pontos_2){
            sobrevivente_1.agua += data.agua_2 - data.agua_1;
            sobrevivente_1.comida += data.comida_2 - data.comida_1;
            sobrevivente_1.medicamento += data.medicamento_2 - data.medicamento_1;
            sobrevivente_1.municao += data.municao_2 - data.municao_1;

            sobrevivente_2.agua += data.agua_1 - data.agua_2;
            sobrevivente_2.comida += data.comida_1 - data.comida_2;
            sobrevivente_2.medicamento += data.medicamento_1 - data.medicamento_2;
            sobrevivente_2.municao += data.municao_1 - data.municao_2;
          }else{
            throw new Error('Os dois sobreviventes precisam oferecer a mesma quantidade de pontos');
          }
        }
      }
      arraySobreviventes = db.sobreviventes.filter((sobre)=>{
        return sobre.id == data.id_1 || sobre.id == data.id_2;
      });
      return arraySobreviventes;
    }
  }
}