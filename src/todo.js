import project from "./project";
function todo() {

    class Todo {
        constructor(title, description, priority, schedule) {

            this.title = title;
            this.description = description;
            this.priority = priority;
            this.schedule = schedule
            this.done = false;
        }
    }

    function addTodo(title, description, priority, schedule, projectTitle) {


        const newTodo = new Todo(title, description, priority, schedule);


        // find index of projectTitle

        let j = 0;
        for (let proj of project.projectList) {
            if (proj.title === projectTitle) {
                break;
            }
            j++;
        }

        project.projectList[j].todo.push(newTodo);
        console.log(project.projectList);
        return addTodo;

    }

    function editTodo() {

    }

    function removeTodo() {


    }

    return {
        addTodo,
        editTodo,
        removeTodo
    };

}

export default todo();