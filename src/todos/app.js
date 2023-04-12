import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderPending, renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    ClearCompletedButton: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
    BtnAgregar: '#btnAgregar',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
    }

    //Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
        renderPending(ElementIDs.PendingCountLabel);
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);
    const btnClearCompleted = document.querySelector(ElementIDs.ClearCompletedButton);
    const filtersLI = document.querySelectorAll(ElementIDs.TodoFilters);
    const btnAgregar = document.querySelector(ElementIDs.BtnAgregar);

    //Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {

        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value.trim());
        displayTodos();
        renderPending(ElementIDs.PendingCountLabel);
        event.target.value = '';
    });

    btnAgregar.addEventListener('click', () => {
        if (newDescriptionInput.value.trim().length === 0) return;

        todoStore.addTodo(newDescriptionInput.value.trim());
        displayTodos();
        renderPending(ElementIDs.PendingCountLabel);
        newDescriptionInput.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
        renderPending(ElementIDs.PendingCountLabel);
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className.includes('destroy');
        const element = event.target.closest('[data-id]');

        if (!element || !isDestroyElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    btnClearCompleted.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLI.forEach(element => {
        element.addEventListener('click', (event) => {
            filtersLI.forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');

            switch (event.target.getAttribute('tipeFilter')) {
                case 'All':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pending':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completed':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });
}