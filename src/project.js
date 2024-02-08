// CRUD Principle
function projects() {

    let projectList = [];
    class Project {
        constructor(title) {

            this.title = title;
            this.todo = [];
        }

    }

    function createProjects(title) {
        const newProject = new Project(title);
        projectList.push(newProject);
        localStorage.setItem('project', JSON.stringify(projectList));
    }

    function listProjects() {

        const connectTaskToProject = document.getElementById('todo-project');
        connectTaskToProject.replaceChildren();
        for (let i = 0; i < projectList.length; i++) {
            const title = document.createElement('option');
            const projectTitle = projectList[i].title;
            title.textContent = projectTitle;
            connectTaskToProject.appendChild(title);

        }
    }

    function updateProjects() {

    }

    function removeProjects() {

    }
    return {
        createProjects,
        listProjects,
        updateProjects,
        removeProjects,
        projectList
    }
}

export default projects();