window.addEventListener("DOMContentLoaded", (e) => {
  const userId = parseInt(document.querySelector("#userId").innerText, 10);
  console.log(userId);
  // ***ADDING NEW CUSTOM SHELF
  const addShelfForm = document.querySelector(".addShelfForm");

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
  });

  // ***ADDING NEW CUSTOM SHELF
});
