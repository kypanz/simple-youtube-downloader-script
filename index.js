const ytdl = require('ytdl-core');
const winston = require('winston');
const fs = require('fs');

function descargar(){

	try{
	
		// Toma de datos de un archivo txt
		const result = fs.readFileSync('./link_para_descargar.txt','utf8');

		result.split('\n').forEach((link) => {
			console.log(link);
			// Validacion del link
			const isLink = ytdl.validateURL(link);
			if(!isLink) {
				// Guardando links no descargados
				fs.writeFileSync('./no_se_descargaron.txt',link+'\n', { encode : 'utf8', flag : 'a' });
				console.log('No se descargaron ciertas musicas, fijate en el archivo "no_se_descargaron.txt" de la carpeta')
			} else {
				// Obtencion de datos del link
				const info = ytdl.getInfo(link);
				// Descarga del archivo
				ytdl.download(link)
				.pipe(fs.writeFileSync(`./musica/${info.videoDetails.title}`));
			}
		});

	} catch(error){
		console.log('no se pudo descargar una musica ...');
		console.log(error);
	}


}

descargar();
