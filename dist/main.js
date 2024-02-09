(()=>{"use strict";const e=function(){let e=[];class t{constructor(e){this.title=e,this.todo=[]}}return{createProjects:function(o){const n=new t(o);e.push(n),localStorage.setItem("project",JSON.stringify(e))},listProjects:function(){const t=document.getElementById("todo-project");t.replaceChildren();for(let o=0;o<e.length;o++){const n=document.createElement("option"),d=e[o].title;n.textContent=d,t.appendChild(n)}},updateProjects:function(t,o){for(let n of e)if(t===n.title){n.title=o;break}},removeProjects:function(){},projectList:e}}(),t=function(){class t{constructor(e,t,o,n,d){this.title=e,this.description=t,this.priority=o,this.schedule=n,this.done=!1,this.projectTitle=d}}return{addTodo:function o(n,d,c,l,a){const i=new t(n,d,c,l,a);let r=0;for(let t of e.projectList){if(t.title===a)break;r++}return e.projectList[r].todo.push(i),o},listTodo:function(t){const o=document.querySelector(".tasks-list");o.replaceChildren();for(let n of e.projectList)if(n.title===t&&n.todo.length>0){const e=n.todo;for(let t=0;t<e.length;t++){const n=document.createElement("div");n.classList.add("todo-container");const d=document.createElement("input");d.type="checkbox",d.classList.add("done-todo-check"),d.id="done-"+e[t].title+"-"+e[t].projectTitle,n.appendChild(d);const c=document.createElement("p");c.classList.add("todo-title");const l=document.createElement("div");l.classList.add("todo-sub-container");const a=document.createElement("button");a.classList.add("todo-details"),a.id="detail-"+e[t].title+"-"+e[t].projectTitle;const i=document.createElement("p"),r=document.createElement("btn");r.id="edit-"+e[t].title+"-"+e[t].projectTitle;const s=document.createElement("btn");s.id="delete-"+e[t].title+"-"+e[t].projectTitle,c.innerHTML=e[t].title,r.innerHTML='<i class="fa-regular fa-pen-to-square"></i>',s.innerHTML='<i class="fa-solid fa-trash"></i>',r.classList.add("edit-todo"),s.classList.add("delete-todo"),i.innerHTML=e[t].schedule,a.innerHTML="DETAILS",a.setAttribute("data-modal-target","#description-modal"),n.appendChild(c),l.appendChild(a),l.appendChild(i),l.appendChild(r),l.appendChild(s),n.appendChild(l),o.appendChild(n)}break}},searchDetails:function(t,o){const n=document.querySelector(".add-description-form-body");n.replaceChildren();for(let d of e.projectList)if(d.title===o){let e=d.todo;for(let o of e)if(o.title===t){const e=document.createElement("div"),t=document.createElement("div"),d=document.createElement("div"),c=document.createElement("div");e.classList.add("details-desc"),t.classList.add("details-desc"),d.classList.add("details-desc"),c.classList.add("details-desc");const l=document.createElement("span"),a=document.createElement("span"),i=document.createElement("span"),r=document.createElement("span");l.textContent="Project: ",a.textContent="Priority: ",i.textContent="Due Date: ",r.textContent="Description: ";const s=document.createElement("p"),u=document.createElement("p"),p=document.createElement("p"),m=document.createElement("p");s.textContent=o.projectTitle,u.textContent=o.priority,p.textContent=o.schedule,m.textContent=o.description,e.appendChild(l),e.appendChild(s),t.appendChild(a),t.appendChild(u),d.appendChild(i),d.appendChild(p),c.appendChild(r),c.appendChild(m),n.appendChild(e),n.appendChild(t),n.appendChild(d),n.appendChild(c);break}}},editTodo:function(){},removeTodo:function(){}}}();!function(){const o=document.querySelector(".add-todo-btn"),n=document.querySelector(".category-name"),d=document.querySelectorAll(".sidebar"),c=document.querySelector("[data-modal-target]"),l=document.querySelectorAll("[data-close-button]"),a=document.getElementById("overlay"),i=document.getElementById("project-content-list");let r=document.querySelectorAll(".project-name");const s=document.getElementById("project-form"),u=document.querySelector(".add-project-button"),p=document.querySelector(".add-task-button"),m=document.getElementById("todo-form"),h=document.getElementById("update-project-modal"),f=document.querySelector(".update-project-button");let E="";const L=document.querySelector(".tasks-list");function C(){const t=e.projectList.length;i.replaceChildren();for(let o=0;o<t;o++){const t=document.createElement("a"),n=document.createElement("li"),d=document.createElement("span"),c=document.createElement("btn"),l=document.createElement("btn"),a=e.projectList[o].title,r=document.createElement("div");c.id="edit-project-"+a,l.id="delete-project-"+a,d.textContent=a,c.innerHTML='<i class="fa-regular fa-pen-to-square"></i>',l.innerHTML='<i class="fa-solid fa-trash"></i>',c.classList.add("edit-project"),l.classList.add("delete-project"),n.id="proj-"+a,d.classList.add("project-name"),t.appendChild(d),t.href="#",t.classList.add("project-link"),n.appendChild(t),r.classList.add("edit-delete"),r.appendChild(c),r.appendChild(l),n.appendChild(r),n.classList.add("projects-sidebar"),i.appendChild(n)}}function j(e){null!=e&&(e.classList.add("active"),a.classList.add("active"))}function y(e){null!=e&&(e.classList.remove("active"),a.classList.remove("active"),s.reset(),m.reset(),r=document.querySelectorAll(".project-name"))}o.addEventListener("click",(()=>{const t=document.querySelector(o.dataset.modalTarget);t.querySelector("h2").textContent="New Task",j(t),e.listProjects()})),p.addEventListener("click",(e=>{e.preventDefault();const n=document.querySelector(o.dataset.modalTarget),d=document.getElementById("todo-title").value,c=document.getElementById("todo-description").value,l=document.getElementById("due-date").value,a=document.getElementById("todo-priority"),i=a.options[a.selectedIndex].text,r=document.getElementById("todo-project"),s=r.options[r.selectedIndex].text;t.addTodo(d,c,i,l,s),y(n)})),c.addEventListener("click",(()=>{const e=document.querySelector(c.dataset.modalTarget);document.querySelector(".modal-header").textContent="New Project",j(e)})),u.addEventListener("click",(t=>{t.preventDefault();const o=document.querySelector(c.dataset.modalTarget),n=document.getElementById("project-title").value;e.createProjects(n),C(),y(o)})),f.addEventListener("click",(t=>{console.log("current version "+e.projectList.length),t.preventDefault();const o=document.getElementById("update-project-title").value;e.updateProjects(E,o),C(),y(h)})),l.forEach((e=>{e.addEventListener("click",(()=>{y(e.closest(".modal"))}))})),a.addEventListener("click",(()=>{document.querySelectorAll(".modal.active").forEach((e=>{y(e)}))})),d.forEach((e=>{e.addEventListener("click",(()=>{n.innerHTML=e.textContent}))})),i.addEventListener("click",(function(e){const o=e.target.closest(".projects-sidebar").id.split("-");if(n.innerHTML=o[1].charAt(0).toUpperCase()+o[1].slice(1),t.listTodo(o[1]),e.target.matches("i"))if("fa-regular fa-pen-to-square"===e.target.className){let t=e.target.closest(".edit-project").id.split("-");E=t[2],j(h)}else console.log("delete")})),L.addEventListener("click",(function(e){const o=e.target.closest(".todo-details"),n=o.id.split("-"),d=document.querySelector(o.dataset.modalTarget);d.querySelector("h2").textContent=n[1].charAt(0).toUpperCase()+n[1].slice(1),t.searchDetails(n[1],n[2]),j(d)}))}()})();