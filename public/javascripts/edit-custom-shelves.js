window.addEventListener("DOMContentLoaded", (e) => {
  const userId = parseInt(document.querySelector("#userId").innerText, 10);

  // ***ADDING NEW CUSTOM SHELF
  const addShelfForm = document.querySelector(".addShelfForm");
  const tbody = document.querySelector("tbody");

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

    if (check === "success") {
      const tr = document.createElement("tr");
      tr.className = "shelf";
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
      const p = document.getElementById("errorMessage");
      p.innerText = check;
    }
  });

  // ***ADDING NEW CUSTOM SHELF

  // Display rename shelf form
  let renameUserShelfLink = document.querySelectorAll(".renameUserShelfLink");

  const displayRenameForm = (e) => {
    let shelfName = e.target.dataset.shelfName;
    let renameUserShelfSpan = document.querySelector(
      `.renameUserShelf.${shelfName}`
    );

    e.target.style.display = "none";
    renameUserShelfSpan.style.display = "inline";
  };

  renameUserShelfLink.forEach((link) => {
    link.addEventListener("click", displayRenameForm);
  });

  // Cancel renaming shelf
  // let cancelRenameBtns = document.querySelectorAll('.cancelRenameBtn');

  // const cancelRename = (e) => {
  //   let shelfName = e.target.dataset.shelfName;
  //   let renameUserShelfSpan = document.querySelector(`.renameUserShelf.${shelfName}`);
  //   let renameLink = document.querySelector(`.renameUserShelfLink.${shelfName}`);

  //   console.log(renameLink);

  //   renameUserShelfSpan.style.display = 'none';
  //   renameLink.style.display = 'inline';
  // };

  // cancelRenameBtns.forEach(button => {
  //   button.addEventListener('click', cancelRename);
  // });
});
