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
  /* Click button
  - grab id of button
  - if button.id = "text", then statusId = number
  - const res = await fetc("long url of api route",
  {
    method: post,
    body: statusId
  }
  )

  */

  const wantToPlayButton = document.querySelector("#statusId1");
  const currentlyPlayingButton = document.querySelector("#statusId2");
  const playedButton = document.querySelector("#statusId3");

  async function updatePlayStatus(e) {
    console.log("HELLOOOOOOOOOOOOOOOOOO");
    let statusId = 1;
    const res = await fetch(
      `/api/users/${userId}/game-guides/${gameId}/status/${statusId}`,
      {
        method: "POST",
        body: JSON.stringify({
          userId,
          gameGuideId: gameId,
          statusId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  wantToPlayButton.addEventListener("click", updatePlayStatus);
  currentlyPlayingButton.addEventListener("click", updatePlayStatus);
  playedButton.addEventListener("click", updatePlayStatus);
});
