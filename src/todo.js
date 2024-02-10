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

    function updateTodo(title, description, priority, schedule, projectTitle, oldData, oldDataIndex) {

        for (let proj of project.projectList) {
            if (oldData.projectTitle === proj.title) {
                console.log("GONE HERE");
                let x = proj.todo;
                console.log(x);
                x[oldDataIndex].title = title;
                x[oldDataIndex].desccription = description;
                x[oldDataIndex].priority = priority;
                x[oldDataIndex].schedule = schedule;
                x[oldDataIndex].projectTitle = projectTitle;
                break;

                console.log("New todo: " + x);
            }
        }


    }

    function changeProjectsTodo(newName) {

        for (let proj of project.projectList) {
            if (newName === proj.title) {
                console.log("Gone through here");
                for (let i = 0; i < proj.todo.length; i++) {

                    proj.todo[i].projectTitle = newName;
                    console.log("HERE: " + proj.todo[i]);
                }
            }
        }
    }

    function removeTodo() {


    }

    return {
        addTodo,
        updateTodo,
        changeProjectsTodo,
        removeTodo
    };

}

export default todo();