document.querySelector('.mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const messageBase = "Welcome To Project "; 
    const projects = ["X...", "Y...", "31."];
    let currentProjectIndex = 0;
    const target = document.getElementById('dynamic-message');
    target.innerText = messageBase; 

    function typeProjectName(projectName, callback) {
        let index = 0;
        function type() {
            if (index < projectName.length) {
                target.innerText = messageBase + projectName.slice(0, index + 1); 
                index++;
                setTimeout(type, 40); 
            } else if (callback) {
                setTimeout(callback, 1500); 
            }
        }
        type();
    }

    function startTypingProjects() {
        if (currentProjectIndex < projects.length) {
            typeProjectName(projects[currentProjectIndex], () => {

                currentProjectIndex++;
                if (currentProjectIndex < projects.length) {
                    startTypingProjects(); 
                } else {

                    document.querySelector('.content-below').style.opacity = 1;
                    document.querySelector('.projects-container').style.opacity = 1;
                }
            });
        }
    }

    setTimeout(startTypingProjects, 500);
});