// this file creates a UI for forms

function add() {
    const todoForm = document.createElement('form');
    todoForm.classList.add('add-item');

    // Form header
    const header = document.createElement('div');
    header.classList.add('create-header');
    const heading = document.createElement('h2');
    heading.textContent = 'Create new';

    const close = document.createElement('button');
    close.textContent = 'X';

    close.addEventListener('click', () => {
    //     closes the screen

    })

    header.appendChild(heading);
    header.appendChild(close);

    return todoForm;
}

export default add;