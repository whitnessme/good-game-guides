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
    const selectedButton = document.querySelector(".wtp-button");
    const currentStatus = document.querySelector(".current-selected-status");
    if (selectedButton) {
      selectedButton.style.backgroundColor = "#f2f2f2";
      selectedButton.style.color = "#181818";
      const newlySelectedStatus = e.target.innerText;
      currentStatus.innerText = newlySelectedStatus;
    } else {
      const newlySelectedStatus = e.target.innerText;
      currentStatus.innerText = newlySelectedStatus;
    }
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

  async function updateStatusWantToPlay(e) {
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
  async function updateStatusCurrentlyPlaying(e) {
    console.log("HELLOOOOOOOOOOOOOOOOOO");
    let statusId = 2;

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
  async function updateStatusPlayed(e) {
    console.log("HELLOOOOOOOOOOOOOOOOOO");
    let statusId = 3;

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

  wantToPlayButton.addEventListener("click", updateStatusWantToPlay);
  currentlyPlayingButton.addEventListener(
    "click",
    updateStatusCurrentlyPlaying
  );
  playedButton.addEventListener("click", updateStatusPlayed);
});
