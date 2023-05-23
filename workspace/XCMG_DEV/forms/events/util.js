function getCurrentDate() {
	return (new java.text.SimpleDateFormat('dd/MM/yyyy')).format(new Date());
}

function getCurrentTime() {
	return (new java.text.SimpleDateFormat('HH:mm')).format(new Date());
}

String.prototype.replaceAll = function(from, to){ 
	var str = this.split(from).join(to); 
	return (str); 
};