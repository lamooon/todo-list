import todo from './todo';
import { compareAsc, format } from "date-fns";

import projects from "./project";
import project from "./project";
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
    const updateTodoButton = document.querySelector('.update-task-button');
    const updateForm = document.getElementById('update-todo-form');
    let oldProjectName = '';
    let oldData;
    let oldDataIndex;
    const tasksList = document.querySelector('.tasks-list');



    addNewTodoBtn.addEventListener('click', () => {
        const modal = document.querySelector(addNewTodoBtn.dataset.modalTarget);
        const heading = modal.querySelector("h2");
        heading.textContent = 'New Task';
        openModal(modal);
        listProjects();
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

        listTodo(whichProject);
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
        e.preventDefault();
        const newName = document.getElementById('update-project-title').value;
        projects.updateProjects(oldProjectName, newName);
        console.log("HERE");
        todo.changeProjectsTodo(newName);
        updateProjectSidebar();
        updatedListProjects();
        listTodo(newName);

        closeModal(updateProject);
    })

    updateTodoButton.addEventListener('click', (e) => {
        e.preventDefault();

        const modal = document.getElementById('update-todo-modal');
        const title = document.getElementById('update-todo-title').value;
        const description = document.getElementById('update-todo-description').value;
        const dueDate = document.getElementById('update-due-date').value;
        const priority = document.getElementById('update-todo-priority');
        const selectedPriority = priority.options[priority.selectedIndex].text;
        const partOfWhichProject = document.getElementById('update-todo-project');
        const whichProject = partOfWhichProject.options[partOfWhichProject.selectedIndex].text;


        todo.updateTodo(title, description, selectedPriority, dueDate, whichProject, oldData, oldDataIndex);
        listTodo(whichProject);

        closeModal(modal);
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
        updateForm.reset();
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
        listTodo(name[1]);

        // if the buttons are pressed (either update or delete)
        if (e.target.matches('i')) {
           if (e.target.className === 'fa-regular fa-pen-to-square') {
               let oldNames = e.target.closest('.edit-project').id.split('-');
               oldProjectName = oldNames[2];
               openModal(updateProject);
           }
           else {
               console.log('delete');
           }
        }
    })

    tasksList.addEventListener('click', function(e) {

        // if updating or deleting, show appropriate form
        if (e.target.matches('i')) {

            if (e.target.className === 'fa-regular fa-pen-to-square') {
                oldDataIndex = 0;
                let oldTodoNames = e.target.closest('.edit-todo').id.split('-');
                let oldTodoName = oldTodoNames[1];
                let projName = oldTodoNames[2];
                for (let proj of projects.projectList) {
                    if (proj.title === projName) {
                        const todos = proj.todo;
                        oldDataIndex = 0;
                        for (let td of todos) {
                            if (td.title === oldTodoName) {
                                oldData = td;
                                break;
                            } else oldDataIndex++;
                        }

                        break;
                    }
                }
                e.preventDefault();
                const modal = document.getElementById('update-todo-modal');


                const title = document.getElementById('update-todo-title');
                const description = document.getElementById('update-todo-description');
                const date = document.getElementById('update-due-date');
                const priority = document.getElementById('update-todo-priority');

                title.value = oldData.title;
                description.value = oldData.description;
                date.value = oldData.schedule;
                priority.value = oldData.priority.toLowerCase();
                updatedListProjects();
                openModal(modal);


            }

            else {

            }

        }
        // you are trying to access the checkbox to show the task is completed
        else if (e.target.matches('input')){
            console.log("omg");
        }
        // if not, you are looking at the details
        else {
            const target = e.target.closest('.todo-details');
            const name = target.id.split("-");
            const modal = document.querySelector(target.dataset.modalTarget);
            const heading = modal.querySelector("h2");
            heading.textContent = name[1].charAt(0).toUpperCase() + name[1].slice(1);
            // console.log("Todo title: " + name[1] + '\n' + "Project title: " +name[2]);
            searchDetails(name[1], name[2]);
            openModal(modal);
        }

    })


    function listTodo(projectName) {

        const todoList = document.querySelector('.tasks-list');
        todoList.innerHTML = '';
        for (let proj of project.projectList) {


            if (proj.title === projectName && proj.todo.length > 0) {

                const todoLayout = proj.todo;
                todoList.replaceChildren();

                for (let i = 0; i < todoLayout.length; i++) {

                    const todoContainer = document.createElement('div');
                    todoContainer.classList.add('todo-container');

                    const done = document.createElement('input');
                    done.type = 'checkbox';
                    done.classList.add('done-todo-check');
                    done.id = 'done-' + todoLayout[i].title + '-' + todoLayout[i].projectTitle;
                    todoContainer.appendChild(done);

                    const title = document.createElement('p');
                    title.classList.add('todo-title');

                    const todoSubContainer = document.createElement('div');
                    todoSubContainer.classList.add('todo-sub-container');
                    const details = document.createElement('button');
                    details.classList.add('todo-details');
                    details.id = 'detail-' + todoLayout[i].title + '-' + todoLayout[i].projectTitle;
                    const deadline = document.createElement('p');
                    const editButton = document.createElement('btn');
                    editButton.id = 'edit-' + todoLayout[i].title + '-' + todoLayout[i].projectTitle;
                    const deleteButton = document.createElement('btn');
                    deleteButton.id = 'delete-' + todoLayout[i].title + '-' + todoLayout[i].projectTitle;

                    title.innerHTML = todoLayout[i].title;



                    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
                    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                    editButton.classList.add('edit-todo');
                    deleteButton.classList.add('delete-todo');

                    deadline.innerHTML = todoLayout[i].schedule;
                    details.innerHTML = 'DETAILS';
                    details.setAttribute('data-modal-target', '#description-modal');

                    todoContainer.appendChild(title);
                    todoSubContainer.appendChild(details);
                    todoSubContainer.appendChild(deadline);
                    todoSubContainer.appendChild(editButton);
                    todoSubContainer.appendChild(deleteButton);
                    todoContainer.appendChild(todoSubContainer);

                    todoList.appendChild(todoContainer);

                }
                break;
            }
        }

    }

    function searchDetails(title, projTitle) {

        const modalBody = document.querySelector('.add-description-form-body');
        modalBody.replaceChildren();

        for (let proj of project.projectList) {

            if (proj.title === projTitle) {

                let todos = proj.todo;

                for (let td of todos) {
                    if (td.title === title) {

                        const project = document.createElement('div');
                        const priority = document.createElement('div');
                        const dueDate = document.createElement('div');
                        const description = document.createElement('div');

                        project.classList.add('details-desc');
                        priority.classList.add('details-desc');
                        dueDate.classList.add('details-desc');
                        description.classList.add('details-desc');

                        const proj = document.createElement('span');
                        const priori = document.createElement('span');
                        const dD = document.createElement('span');
                        const desc = document.createElement('span');

                        proj.textContent = "Project: ";
                        priori.textContent = "Priority: ";
                        dD.textContent = "Due Date: ";
                        desc.textContent = "Description: ";

                        const projDesc = document.createElement('p');
                        const prioriDesc = document.createElement('p');
                        const dDDesc = document.createElement('p');
                        const descDesc = document.createElement('p');

                        projDesc.textContent = td.projectTitle;
                        prioriDesc.textContent = td.priority;
                        dDDesc.textContent = td.schedule;
                        descDesc.textContent = td.description;

                        project.appendChild(proj);
                        project.appendChild(projDesc);
                        priority.appendChild(priori);
                        priority.appendChild(prioriDesc);
                        dueDate.appendChild(dD);
                        dueDate.appendChild(dDDesc);
                        description.appendChild(desc);
                        description.appendChild(descDesc);

                        modalBody.appendChild(project);
                        modalBody.appendChild(priority);
                        modalBody.appendChild(dueDate);
                        modalBody.appendChild(description);
                        break;
                    }
                }
            }
        }


    }


    function listProjects() {

        const connectTaskToProject = document.getElementById('todo-project');
        connectTaskToProject.replaceChildren();
        for (let i = 0; i < projects.projectList.length; i++) {
            const title = document.createElement('option');
            const projectTitle = projects.projectList[i].title;
            title.textContent = projectTitle;
            connectTaskToProject.appendChild(title);

        }
    }

    function updatedListProjects() {

        const connectTaskToProject = document.getElementById('update-todo-project');
        connectTaskToProject.replaceChildren();
        for (let i = 0; i < projects.projectList.length; i++) {
            const title = document.createElement('option');
            const projectTitle = projects.projectList[i].title;
            title.textContent = projectTitle;
            connectTaskToProject.appendChild(title);

        }
    }
}

export default dom;