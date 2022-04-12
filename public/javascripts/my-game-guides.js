window.addEventListener('DOMContentLoaded', (e) => {
    // Global Variable
    const userId = parseInt(document.querySelector("#userId").innerText, 10);

    // Display add shelf form
    let addShelfBtn = document.querySelector('#addShelfBtn');
    let newShelfFormDiv = document.querySelector('#newShelfForm');

    const displayAddShelfForm = (e) => {
        newShelfFormDiv.style.display = 'inline-block';
        addShelfBtn.style.display = 'none';
    };

    addShelfBtn.addEventListener('click', displayAddShelfForm);

    // Display custom shelf when form is submitted
    let shelfList = document.querySelector('#shelfList');
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
    let removeStatusGuideBtns = document.querySelectorAll('.removeStatusGuideBtn');

    const removeGuideFromStatusShelf = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let gameGuideId = e.target.dataset.gameGuideId;
        let gameGuideTitle = e.target.dataset.gameGuideTitle;
        let statusId = e.target.dataset.statusId;


        let allCountATag = document.querySelector('.count-a-status-all')
        let currentAllNumber = parseInt(allCountATag.innerText.split('(')[1][0]) - 1
        console.log(allCountATag, currentAllNumber)

        let selectedStatusShelfCountText = document.querySelector(`.count-a-status-${statusId}`)
        let currentNumber = parseInt(selectedStatusShelfCountText.innerText.split('(')[1][0]) - 1

        if (window.confirm(`Are you sure you'd like to remove ${gameGuideTitle}?`)) {
            const res = await fetch(`/users/${userId}/game-guides/${gameGuideId}/status/${statusId}`, {
                method: "DELETE",
            });

          if (res.ok) {
              e.path[2].remove();
              allCountATag.innerText = ` (${currentAllNumber})`
              selectedStatusShelfCountText.innerText = ` (${currentNumber})`
          } 
        }

    };

    removeStatusGuideBtns.forEach(button => {
        button.addEventListener('click', removeGuideFromStatusShelf);
    });

    // Remove guide from custom shelf
    let removeCustomGuideBtns = document.querySelectorAll('.removeCustomGuideBtn');

    const removeGuideFromCustomShelf = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let gameGuideId = e.target.dataset.gameGuideId;
        let gameGuideTitle = e.target.dataset.gameGuideTitle;
        let shelfName = e.target.dataset.shelfName;

        let customShelfCount = document.querySelector(`.count-a-custom-${shelfName}`);
        let currentCount = parseInt(customShelfCount.innerText.split('(')[1][0]) - 1

        if (window.confirm(`Are you sure you'd like to remove ${gameGuideTitle} from ${shelfName}?`)) {
            const res = await fetch(`/users/${userId}/game-guides/${gameGuideId}/custom/${shelfName}`, {
                method: "DELETE",
            });

          if (res.ok) {
              e.path[2].remove();
              customShelfCount.innerText = ` (${currentCount})`
          }
        }
    };

    removeCustomGuideBtns.forEach(button => {
        button.addEventListener('click', removeGuideFromCustomShelf);
    });

})
