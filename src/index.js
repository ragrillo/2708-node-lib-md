import fs from 'fs';
import chalk from "chalk";


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({
        [captura[1]]:captura[2]
    }))
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo'
}


function trataErro(erro){
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));

}


//promise com then () - Assincrona
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8'
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)

// }

// async/await - Assincrona

async function pegaArquivo(caminhoDoArquivo){
    const encoding = 'utf-8';
    try{
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
       return extraiLinks(texto)
    }catch(erro){
        trataErro(erro)
    }finally {
        console.log(chalk.yellow('Operação Concluída'));
    }
}



//Função sincrona
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8'
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro){
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto))
//     })
// }

export default pegaArquivo;


