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



    function updateProjects(originalName, newName) {

        for (let proj of projectList) {
            if (originalName === proj.title) {
                proj.title = newName;
                break;
            }
        }

    }

    function removeProjects() {

    }
    return {
        createProjects,
        updateProjects,
        removeProjects,
        projectList
    }
}

export default projects();