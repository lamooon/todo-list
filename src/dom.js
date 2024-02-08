import todo from './todo';
import { compareAsc, format } from "date-fns";

import projects from "./project";
function dom() {

    const addNewTodoBtn = document.querySelector('.add-todo-btn');
    const categoryName = document.querySelector('.category-name');
    const sidebar = document.querySelectorAll('.sidebar');
    const addProjectBtn = document.querySelector('[data-modal-target]');
    const closeModalBtn = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const projectsSidebar = document.getElementById('project-content-list');
    const projectForm = document.getElementById('project-form');
    const projectNames = document.querySelectorAll('.project-name')
    const confirmAddProjectButton = document.querySelector('.add-project-button');
    const confirmAddTodoButton = document.querySelector('.add-task-button');
    const todoForm = document.getElementById('todo-form');


    addNewTodoBtn.addEventListener('click', () => {
        const modal = document.querySelector(addNewTodoBtn.dataset.modalTarget);
        const heading = modal.querySelector("h2");
        heading.textContent = 'New Task';
        openModal(modal);
        projects.listProjects();
    });

    confirmAddTodoButton.addEventListener('click', (e) => {

        e.preventDefault();
        const modal = document.querySelector(addNewTodoBtn.dataset.modalTarget);

        const todoTitle = document.getElementById('todo-title').value;
        const description = document.getElementById('todo-description').value;

        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('todo-priority');
        const selectedPriority = priority.options[priority.selectedIndex].text;

        console.log(selectedPriority);

        const partOfWhichProject = document.getElementById('todo-project');
        const whichProject = partOfWhichProject.options[partOfWhichProject.selectedIndex].text;

        todo.addTodo(todoTitle, description, selectedPriority, dueDate, whichProject);

        todoForm.reset();
        closeModal(modal);
    })

    addProjectBtn.addEventListener('click', () => {

        const modal = document.querySelector(addProjectBtn.dataset.modalTarget);
        const heading = document.querySelector(".modal-header");
        heading.textContent = 'New Project';
        openModal(modal);


    })



    confirmAddProjectButton.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector(addProjectBtn.dataset.modalTarget);
        const projectLink = document.createElement('a');
        const projectContainer = document.createElement('li');
        const projectName = document.createElement('span');

        const projectTitle = document.getElementById('project-title').value;
        projects.createProjects(projectTitle);

        projectName.textContent = projectTitle;
        projectName.classList.add('project-name');
        projectLink.appendChild(projectName);
        projectContainer.appendChild(projectLink);
        projectContainer.classList.add('projects-sidebar');
        projectsSidebar.appendChild(projectContainer);

        projectForm.reset();
        closeModal(modal);
    });

    closeModalBtn.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            closeModal(modal);
        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    })

    function openModal(modal) {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }



    sidebar.forEach((category) => {
        category.addEventListener('click', () => {
            categoryName.innerHTML = category.textContent;

        //     should add what tasks fall under this category
        })
    })

    projectNames.forEach((category) => {
        category.addEventListener('click', () => {
            console.log("I have been clicked")
            categoryName.innerHTML = category.textContent;

            //     should add what tasks fall under this category
        })
    })



}

export default dom;