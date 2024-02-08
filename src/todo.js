
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

    function addTodo(taskIndex, title, description, priority, schedule, index) {

        const newTodo = new Todo(title, description, priority, schedule);


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

export default todo;