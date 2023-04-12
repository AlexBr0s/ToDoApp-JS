import { v4 as uuid } from "uuid";


export class Todo {

    /**
     * Crea una nueva instancia de Todo
     * @param {String} description 
     */
    constructor( description ){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

}