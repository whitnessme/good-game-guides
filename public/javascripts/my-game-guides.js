window.addEventListener('DOMContentLoaded', (e) => {
    // Display add shelf form
    let addShelfBtn = document.querySelector('#addShelfBtn');

    const displayAddShelfForm = (e) => {
        let newShelfFormDiv = document.querySelector('#newShelfForm');
        newShelfFormDiv.style.display = 'inline-block';
        addShelfBtn.style.display = 'none';
    };

    addShelfBtn.addEventListener('click', displayAddShelfForm);

    // Display custom shelf when form is submitted
    let addShelfForm = document.querySelector('.add-shelf-form');

    const submitAddShelfForm = (e) => {
        addShelfBtn.style.display = 'inline-block';
        newShelfFormDiv.style.display = 'none';
    };

    addShelfForm.addEventListener('submit', submitAddShelfForm);
})
