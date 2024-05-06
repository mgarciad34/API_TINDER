const { Persona } = require('./Persona')

let valores = [new Persona('Carlos',18), new Persona('Inés',20), new Persona('Javi',21), new Persona('Marina',22)]

const addPersona = (p) => {
    valores.push(p);
}

const getPersona = (i) => {
    return valores[i];
}

const removePersonaAt = (i) => {
    valores.splice(i, 1);
}

const updatePersonaAt = (i, p) => {
    valores[i] = p;
}

module.exports = {
    valores,
    addPersona,
    getPersona,
    removePersonaAt,
    updatePersonaAt
};