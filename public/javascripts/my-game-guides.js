window.addEventListener('DOMContentLoaded', (e) => {
    // Display add shelf form
    let addShelfBtn = document.querySelector('#addShelfBtn');

    const displayAddShelfForm = (e) => {
        let newShelfForm = document.querySelector('#newShelfForm');
        newShelfForm.style.display = 'inline-block';
        addShelfBtn.style.display = 'none';
    };

    addShelfBtn.addEventListener('click', displayAddShelfForm);
})
