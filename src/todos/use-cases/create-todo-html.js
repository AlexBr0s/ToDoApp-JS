import { Todo } from "../models/todo.model";

/**
 * Funcion para crear el componente html con el todo
 * @param {Todo} todo 
 * @returns {String}
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error(' A Todo object is required');

    const { done, description, id } = todo;

    const html = ` 
        <div class="row align-items-center">
            <div class="col-2">
                <input type="checkbox" class="btn-check" id="${id}" autocomplete="off" ${done ? 'checked' : ''}>
                <label class="btn btn-outline-${done ? 'success' : 'secondary'} rounded-circle btn-sm me-2" for="${id}">
                    <span class="material-symbols-outlined">
                        done
                    </span>
                </label>
            </div>
            <div class="col-8">
                ${description}
            </div>
            <div class="destroy col-2 text-end text-danger" role="button">
                <span class="destroy material-symbols-outlined" style="font-size: 1.5rem">
                    delete
                </span>
            </div>
        </div>
    `;

    const liElement = document.createElement('li');
    liElement.classList.add('list-group-item');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);

    return liElement
}