import dom from "./dom";

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
        console.log(projectList);
        localStorage.setItem('project', JSON.stringify(projectList));
    }

    function listProjects() {


        for (let i = 0; i < projectList.length; i++) {

        }
    }

    function updateProjects() {

    }

    return {
        createProjects,
        listProjects,
        updateProjects
    }
}

export default projects();