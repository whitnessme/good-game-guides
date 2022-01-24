window.addEventListener("DOMContentLoaded", (e) => {
  const userId = parseInt(document.querySelector("#userId").innerText, 10);
  console.log(userId);
  // ***ADDING NEW CUSTOM SHELF
  const addShelfForm = document.querySelector(".addShelfForm");
  const tbody = document.querySelector('tbody');

  addShelfForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addShelfForm);

    const shelfName = formData.get("addShelf");

    const res = await fetch(`/users/${userId}/customShelves`, {
      method: "POST",
      body: JSON.stringify({
        name: shelfName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const { check } = data;

    console.log(check);

    if (check === 'success') {
      const tr = document.createElement('tr');
      tr.className = 'shelf';
      tr.innerHTML = `
      <td class="remove">
        <a class="removeShelfBtn">X</a>
      </td>
      <td class="userShelf">
        <div class="displayShelfName">
          <a class="displayShelfNameLink" href="/my-game-guides/custom-shelves/${shelfName}">${shelfName} (0)</a>
          <a class="renameUserShelfLink" href="#"> Rename</a>
        </div>
        <div class="renameUserShelf">
          <form class="renameShelfForm" action="#" method="post">
            <input type="hidden" name="_csrf" value=csrfToken>
            <input class="renameUserShelfText" type="text" name="renameShelf" value="${shelfName}">
            <button class="renameShelfBtn" type="button">Save</button>
            <a class="cancelRenameBtn" href="#">Cancel</a>
          </form>
        </div>
      </td>
      `;

      tbody.appendChild(tr);
    } else {
      const p = document.getElementById('errorMessage');
      p.innerText = check;
    }

  });

  // ***ADDING NEW CUSTOM SHELF
});
