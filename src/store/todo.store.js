import { Todo } from '../todos/models/todo.model'

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Hacer tarea de matematicas'),
        new Todo('Pasear al perro'),
        new Todo('Comprar pan'),
        new Todo('Lavar platos'),
        new Todo('Partido de futbol 5 PM'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
    console.log('InitStore 😈');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}


const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
            
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * Funcion para agregar un nuevo todo mediante su descripcion
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is requiered');

    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * Funcion para cambiar el estado de un todo por su ID
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    });

    saveStateToLocalStorage();
}

/**
 * Funcion para borrar un todo por su ID
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);

    saveStateToLocalStorage();
}

/**
 * Funcion para borrar todos los todos completados
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);

    saveStateToLocalStorage();
}

/**
 * Funcion para asignar el valor del filtro
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    if (![Filters.All, Filters.Completed, Filters.Pending].includes(newFilter))
        throw new Error(`Option ${newFilter} is not valid.`);
    state.filter = newFilter;

    saveStateToLocalStorage();
}

/**
 * Funcion para obtener el filtro actual
 * @returns {String}
 */
const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}