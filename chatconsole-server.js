var soks = {},
	io = require('socket.io').listen(80);
	
io.sockets.on('connection', function (socket) {

	socket.on('identificate' , function (data) {
		
		if (! soks[data.nombre] ) {
			soks[data.nombre] =  socket;
			console.log(' + ==> ' + data.nombre)
		} else {
			socket.emit('error', {msg: 'Usuario ya existe'});
			socket.disconnect();
		}
		return;
	})

	socket.on('msg:individual', function (data) {
		soks[data.nombre].emit('msg:individual', {nombre: data.nombre, msg: data.msg})
	})


});



