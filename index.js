const ytdl = require('ytdl-core');
const winston = require('winston');
const fs = require('fs');

function descargar(){

	try{

		// Toma de datos de un archivo txt
		const result = fs.readFileSync('./link_para_descargar.txt','utf8');

		result.split('\n').forEach(async (link) => {

			// Validacion del link
			const isLink = ytdl.validateURL(link);

			// Sacando la parte necesaria
			link = link.slice(32);

			if(!isLink) {
				// Guardando links no descargados
				fs.writeFileSync('./no_se_descargaron.txt',link+'\n', { encode : 'utf8', flag : 'a' });
				console.log('No se descargaron ciertas musicas, fijate en el archivo "no_se_descargaron.txt" de la carpeta')
			} else {
				// Obtencion de datos del link
				const info = await ytdl.getInfo(link);
				// Descarga del archivo
				console.log('[ Descargando ] : ', info.videoDetails.title);
				const stream = ytdl(link, { filter: 'audioonly' });
				const nuevoNombre = (info.videoDetails.title).split(" ").join("");
				const file = fs.createWriteStream(`./musica/${nuevoNombre}.mp3`);
				stream.pipe(file);

				stream.on('end', () => {
					console.log('[ Descarga completada. ] ' + info.videoDetails.title);
				});
			}
		});

	} catch(error){
		console.log('no se pudo descargar una musica ...');
		console.log(error);
	}


}

descargar();
