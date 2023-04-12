import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./";

let element;

/**
 * Funcion para renderisar los todos en la app
 * @param {String} elemetId 
 * @param {Array<Todo>} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    if (!element)
        element = document.querySelector(elementId);

    if (!element) throw new Error(`Element ${ elementId } not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });

}