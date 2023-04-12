import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * Funcion para renderizar el contador de pendientes
 * @param {String} elementID 
 */
export const renderPending = (elementID) => {
    if (!element)
        element = document.querySelector(elementID);

    if (!element) throw new Error(`Element ${elementID} not found`);

    element.innerText = todoStore.getTodos( Filters.Pending ).length;
}