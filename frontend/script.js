async function getProjects() {
    const url = "http://localhost:3000/projects";
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        const resultat = await reponse.json();

        console.log(resultat);

        const projectsplace = document.getElementById("projects");

        projectsplace.innerHTML = "";

        for (const project of resultat) {

        texte_tasks= await getTasks(project.id);
        tmp_texte=texte_tasks;
        projectsplace.innerHTML += `<div class="project-id"><h3>${project.name}</h3> <p>${project.description} </p>
        <button class="button-delete-project" data-id=${project.id}> Supprimer le projet</button></br>
        <button class="button-post-tasks" data-id=${project.id}> Ajouter une tâche</button>
        <label>Nom de la tâche</label> <input type="text" class="tache-nom">
        <label>Description de la tâche</label> <input type="text" class="tache-description">
        <select class="tache-status"><option value="TODO">À faire</option><option value="IN_PROGRESS">En cours</option><option value="DONE">Terminée</option></select>
        <select class="tache-priority"><option value="LOW">Basse</option><option value="MEDIUM">Moyenne</option><option value="HIGH">Haute</option></select>
        <div class="tasks">${tmp_texte}</div>

        </div>
        `;
        

        };

        setupDeleteButtons();
        setupDeleteButtons_tasks();
        setupPostButtons_tasks();
    } catch (erreur) {
        console.error(erreur.message);
    }

}


async function postProjects(name, description) {
    const url = "http://localhost:3000/projects";
    try {
        const reponse = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: name, description: description })
    });

        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        getProjects();
        
    } catch (erreur) {
        console.error(erreur.message);
    }
}


async function deleteProjects(id) {
    const url = `http://localhost:3000/projects/${id}`;
    try {
        const reponse = await fetch(url, {
        method: "DELETE"
    });

        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        getProjects();
        
    } catch (erreur) {
        console.error(erreur.message);
    }
}


async function getTasks(id) {
    const url = `http://localhost:3000/projects/${id}/tasks`;

    try {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        const resultat = await reponse.json();

        console.log(resultat);

        let texte = "";
    
        resultat.forEach(tasks => {
            texte += `<h2>${tasks.name}</h2>
            <p>Description : ${tasks.description}</p>
            <p>Statut : ${tasks.status}</p>
            <p>Priorité : ${tasks.priority}</p>
            <button class="button-delete-tache" data-id=${tasks.id}> Supprimer la tâche</button>`;
        });

        return texte;

    } catch (erreur) {
        console.error(erreur.message);
        return "";
    }

}

async function postTasks(project_id, name, description, status, priority) {
    const url = `http://localhost:3000/projects/${project_id}/tasks`;
    try {
        const reponse = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ project_id: project_id,   name: name, description: description, status: status, priority: priority })
    });

        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        getProjects();
        
    } catch (erreur) {
        console.error(erreur.message);
    }
}


async function deleteTasks(id) {
    const url = `http://localhost:3000/tasks/${id}`;
    try {
        const reponse = await fetch(url, {
        method: "DELETE"
    });

        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }

        getProjects();
        
    } catch (erreur) {
        console.error(erreur.message);
    }
}


function setupDeleteButtons() {
    const bouton_delete = document.querySelectorAll(".button-delete-project");

    bouton_delete.forEach(bouton => {
        bouton.addEventListener("click", () => {
            deleteProjects(bouton.dataset.id);
        });
    });
}

function setupDeleteButtons_tasks() {
    const bouton_delete_tasks = document.querySelectorAll(".button-delete-tache");

    bouton_delete_tasks.forEach(bouton => {
        bouton.addEventListener("click", () => {
            deleteTasks(bouton.dataset.id);
        });
    });
}

function setupPostButtons_tasks() {
    const boutons = document.querySelectorAll(".button-post-tasks");

    boutons.forEach(bouton => {
        bouton.addEventListener("click", () => {

            const project_id = bouton.dataset.id;
            const nom = bouton.parentElement.querySelector(".tache-nom").value;
            const description = bouton.parentElement.querySelector(".tache-description").value;
            const status = bouton.parentElement.querySelector(".tache-status").value;
            const priority = bouton.parentElement.querySelector(".tache-priority").value;

            postTasks(project_id, nom, description, status, priority);
        });
    });
}




const bouton_create = document.querySelector("#button-project");
const project_name = document.getElementById('project-name');
const project_description = document.getElementById('project-description');

bouton_create.addEventListener("click", () => {
  postProjects(project_name.value, project_description.value);
});



getProjects();