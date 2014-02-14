var sok,
	socket = require('socket.io-client'),
	so = socket.connect('http://localhost');


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



so.on('connect', function(){

	rl.write('Tu nombre: ');
	rl.on('line', function (ind) {
		console.log('Hola ' + ind.split('Tu nombre: ')[1] + ' bienvenido al chat')
		so.emit('identificate', {nombre: ind.split('Tu nombre: ')[1]})
	})

	so.on('msg:individual', function(data){
		console.log(data.nombre + ': ' + data.msg)
	});

	//so.emit('msg:individual', {nombre: 'Andres', msg: 'Holaaaaa'})

	so.on('disconnect', function(){
		console.log('Desconectado')
	});

	sok = so;

});

