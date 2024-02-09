import project from "./project";
import dom from "./dom";
function todo() {

    class Todo {
        constructor(title, description, priority, schedule, projectTitle) {

            this.title = title;
            this.description = description;
            this.priority = priority;
            this.schedule = schedule
            this.done = false;
            this.projectTitle = projectTitle;
        }
    }

    function addTodo(title, description, priority, schedule, projectTitle) {


        const newTodo = new Todo(title, description, priority, schedule, projectTitle);


        // find index of projectTitle

        let j = 0;
        for (let proj of project.projectList) {
            if (proj.title === projectTitle) {
                break;
            }
            j++;
        }

        project.projectList[j].todo.push(newTodo);
        return addTodo;

    }

    function listTodo(projectName) {

        const todoList = document.querySelector('.tasks-list');
        todoList.replaceChildren();
        for (let proj of project.projectList) {


            if (proj.title === projectName && proj.todo.length > 0) {

                const todoLayout = proj.todo;

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


    function editTodo() {

    }

    function removeTodo() {


    }

    return {
        addTodo,
        listTodo,
        searchDetails,
        editTodo,
        removeTodo
    };

}

export default todo();