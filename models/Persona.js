class Persona {
    nombre = '';
    edad = 0;
    
    constructor(n = '', e = 0){
        this.nombre = n;
        this.edad = e;
    }
}

module.exports = {Persona}