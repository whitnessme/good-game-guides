window.addEventListener("DOMContentLoaded", (e) => {
  // GLOBAL VARIABLES

  const gameId = parseInt(window.location.href.split("/")[4], 10);
  const userId = parseInt(document.querySelector("#userId").innerText, 10);

  // display dropdown menu
  let shelfDropDownButton = document.querySelector(".shelf-dropdown-button");
  function toggleDropDown(e) {
    let shelfMenu = document.querySelector(".wtp-shelf-menu");
    if (shelfMenu.style.display !== "none") {
      shelfMenu.style.display = "none";
    } else {
      shelfMenu.style.display = "block";
    }
  }
  shelfDropDownButton.addEventListener("click", toggleDropDown);

  // updating status shelf
  const shelf = document.querySelector(".wtp-exclusive-shelves");
  function updateStatusInDom(e) {
    const currentStatus = document.querySelector(".current-selected-status");
    const newlySelectedStatus = e.target.innerText;
    currentStatus.innerText = newlySelectedStatus;
  }
  shelf.addEventListener("click", updateStatusInDom);

  // Update shelf status of book
});
