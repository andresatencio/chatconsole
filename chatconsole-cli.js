var sok,
	socket = require('socket.io-client'),
	so = socket.connect('http://localhost:8080');


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var flag = true,
	nombre;

so.on('connect', function(){

	rl.write('Tu nombre: ');
	rl.on('line', function (ind) {
		
		init();


		function init() {
			if ( flag ) {
				nombre = ind.split('Tu nombre: ')[1];
				console.log('Hola ' + nombre + ' bienvenido al chat')
				so.emit('identificate', {nombre: nombre})
				flag = false;
			} else {
				so.emit('msg:todos', {nombre: nombre, msg:ind})
			}
		}

	})

	so.on('msg:individual', function(data){
		console.log(data.nombre + ': ' + data.msg)
	});

	so.on('msg:todos', function(data){
		console.log(data.nombre + ': ' + data.msg)
	});

	so.on('disconnect', function(){
		console.log('Desconectado')
	});

	sok = so;

});

