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
    let projectSidebar = document.querySelectorAll('.project-name');
    const projectForm = document.getElementById('project-form');
    const confirmAddProjectButton = document.querySelector('.add-project-button');
    const confirmAddTodoButton = document.querySelector('.add-task-button');
    const todoForm = document.getElementById('todo-form');
    const updateProject = document.getElementById('update-project-modal');
    const updateProjectButton = document.querySelector('.update-project-button');
    let oldName = '';
    const tasksList = document.querySelector('.tasks-list');

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
        const partOfWhichProject = document.getElementById('todo-project');
        const whichProject = partOfWhichProject.options[partOfWhichProject.selectedIndex].text;

        todo.addTodo(todoTitle, description, selectedPriority, dueDate, whichProject);


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
        const projectTitle = document.getElementById('project-title').value;
        projects.createProjects(projectTitle);

        updateProjectSidebar();
        closeModal(modal);

    });

    updateProjectButton.addEventListener('click', (e) => {
        console.log('current version ' + projects.projectList.length);
        e.preventDefault();
        const newName = document.getElementById('update-project-title').value;
        projects.updateProjects(oldName, newName);

        updateProjectSidebar();
        closeModal(updateProject);
    })

    function updateProjectSidebar() {
        const x = projects.projectList.length;
        projectsSidebar.replaceChildren();
        for (let i = 0; i < x; i++) {

            const projectLink = document.createElement('a');
            const projectContainer = document.createElement('li');
            const projectName = document.createElement('span');
            const editButton = document.createElement('btn');

            const deleteButton = document.createElement('btn');
            const projectTitle = projects.projectList[i].title;
            const buttonContainer = document.createElement('div');
            editButton.id = 'edit-project-' + projectTitle;
            deleteButton.id = 'delete-project-' + projectTitle;

            projectName.textContent = projectTitle;

            editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
            editButton.classList.add('edit-project');
            deleteButton.classList.add('delete-project');

            projectContainer.id = "proj-" + projectTitle;
            projectName.classList.add('project-name');
            projectLink.appendChild(projectName);
            projectLink.href = '#';
            projectLink.classList.add('project-link');
            projectContainer.appendChild(projectLink);
            buttonContainer.classList.add('edit-delete');
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            projectContainer.appendChild(buttonContainer);
            projectContainer.classList.add('projects-sidebar');
            projectsSidebar.appendChild(projectContainer);
        }
    }


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
        projectForm.reset();
        todoForm.reset();
        projectSidebar = document.querySelectorAll('.project-name');

    }

    sidebar.forEach((category) => {
        category.addEventListener('click', () => {
            categoryName.innerHTML = category.textContent;

        //     should add what tasks fall under this category
        })
    })

    // used to capture clicks on dynamically created elements
    // also detects update and delete buttons in the sidebar
    projectsSidebar.addEventListener('click', function(e) {
        const target = e.target.closest('.projects-sidebar');

        const name = target.id.split("-");
        categoryName.innerHTML = name[1].charAt(0).toUpperCase() + name[1].slice(1);
        todo.listTodo(name[1]);

        // if the buttons are pressed (either update or delete)
        if (e.target.matches('i')) {
           if (e.target.className === 'fa-regular fa-pen-to-square') {
               let oldNames = e.target.closest('.edit-project').id.split('-');
               oldName = oldNames[2];
               openModal(updateProject);
           }
           else {
               console.log('delete');
           }
        }
    })

    tasksList.addEventListener('click', function(e) {

        const target = e.target.closest('.todo-details');
        const name = target.id.split("-");
        const modal = document.querySelector(target.dataset.modalTarget);
        const heading = modal.querySelector("h2");
        heading.textContent = name[1].charAt(0).toUpperCase() + name[1].slice(1);
        todo.searchDetails(name[1], name[2]);
        openModal(modal);
    })





}

export default dom;