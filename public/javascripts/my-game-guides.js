window.addEventListener('DOMContentLoaded', (e) => {
    // Global Variable
    const userId = parseInt(document.querySelector("#userId").innerText, 10);

    // Change color of shelf link when on specific shelf's page
    let shelfList = document.querySelector('#shelfList');
    // let userShelves = document.querySelectorAll('.userShelf');

    // const changeShelfTextColor = (e) => {

    // };

    // shelfList.addEventListener('click', changeShelfTextColor);

    // Display add shelf form
    let addShelfBtn = document.querySelector('#addShelfBtn');
    let newShelfFormDiv = document.querySelector('#newShelfForm');

    const displayAddShelfForm = (e) => {
        newShelfFormDiv.style.display = 'inline-block';
        addShelfBtn.style.display = 'none';
    };

    addShelfBtn.addEventListener('click', displayAddShelfForm);

    // Display custom shelf when form is submitted
    let addShelfForm = document.querySelector('.add-shelf-form');
    let addShelfInput = document.querySelector('#addShelf');

    const submitAddShelfForm = async (e) => {
        e.preventDefault();

        const res = await fetch(`/users/${userId}/customShelves`, {
            method: "POST",
            body: JSON.stringify({
                name: addShelfInput.value
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        const { check } = data;

        if (check === 'success') {
            const div = document.createElement('div');
            div.className = 'userShelf';
            div.innerHTML = `<a href=/my-game-guides/custom-shelves/${addShelfInput.value}>${addShelfInput.value}</a>`;

            shelfList.appendChild(div);

            addShelfBtn.style.display = 'inline-block';
            newShelfFormDiv.style.display = 'none';
        } else {
            const p = document.getElementById('errorMessage');
            p.innerText = check;
        }

    };

    addShelfForm.addEventListener('submit', submitAddShelfForm);

    // Remove guide from status shelf
    let removeGuideBtn = document.getElementById('removeGuideBtn');
    let tableDataRow = document.getElementById('tableDataRow');

    const removeGuideFromStatusShelf = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let gameGuideId = tableDataRow.childNodes[0].childNodes[0].href.split('/')[4];
        let statusId = tableDataRow.childNodes[5].childNodes[0].href.split('/')[5];

        const res = await fetch(`/users/${userId}/game-guides/${gameGuideId}/status/${statusId}`, {
            method: "DELETE",
        });

        // if (res.ok) tableDataRow.remove();
    };

    removeGuideBtn.addEventListener('click', removeGuideFromStatusShelf);

    // Remove guide from custom shelf
    const removeGuideFromCustomShelf = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Adjust fetch path
        const res = await fetch(`/users/${userId}/game-guides/:id/custom/:id`);
    };
})
