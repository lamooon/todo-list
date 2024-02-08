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
    const projectSidebar = document.querySelectorAll('.projects-sidebar')
    const confirmAddProjectButton = document.querySelector('.add-project-button');
    const confirmAddTodoButton = document.querySelector('.add-todo-button');




    addNewTodoBtn.addEventListener('click', () => {
        const modal = document.querySelector(addNewTodoBtn.dataset.modalTarget);
        const heading = modal.querySelector("h2");
        heading.textContent = 'New Task';
        openModal(modal);
    })

    addProjectBtn.addEventListener('click', () => {

        const modal = document.querySelector(addProjectBtn.dataset.modalTarget);
        const heading = document.querySelector(".modal-header");
        heading.textContent = 'New Project';
        openModal(modal);


    })



    confirmAddProjectButton.addEventListener('click', () => {
        const modal = document.querySelector(addProjectBtn.dataset.modalTarget);
        const projectLink = document.createElement('a');
        const projectContainer = document.createElement('li');
        const projectName = document.createElement('span');

        const projectTitle = document.getElementById('project-title').value;
        console.log(projectTitle);
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

    projectSidebar.forEach((category) => {
        category.addEventListener('click', () => {
            const name = category.querySelector('.project-name');
            console.log(name);
            categoryName.innerHTML = name.textContent;

            //     should add what tasks fall under this category
        })
    })



}

export default dom;