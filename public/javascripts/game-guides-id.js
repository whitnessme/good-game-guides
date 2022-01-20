window.addEventListener("DOMContentLoaded", (e) => {
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
});
