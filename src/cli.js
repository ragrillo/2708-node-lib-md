import chalk from "chalk";
import fs from 'fs';
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";


const caminho = process.argv;

async function imprimeLista (valida, resultado, identificador = ''){

    if (valida ){
        console.log(
            chalk.yellow('lista validade'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado))

    } else {
        console.log(
            chalk.yellow('lista de links'), 
            chalk.black.bgGreen(identificador),
            resultado)

    }
}

async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';  //guardar True ou False
    

    try {
        fs.lstatSync(caminho)
        
    } catch (error) {
        if (error.code === 'ENOENT'){
            console.log(chalk.red('Arquivo ou diretório não existe'))
            return; // com o Return não aparece toda a mensagem de erro apenas a escrita acima
        }
    }

    if (fs.statSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imprimeLista(valida, resultado)
    } else if(fs.statSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista =  await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
            
        })
    }
}

processaTexto(caminho)

