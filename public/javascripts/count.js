window.addEventListener("DOMContentLoaded", async () => {
  // need to find userId
  // need to find statusId

  const wantPlay = 1;
  const currPlay = 2;
  const played = 3;

  async function updateStatusShelvesCount(statusId, userId) {
    const body = { statusId, userId };

    const res = await fetch(`/count/status`, {
      method: "GET",
      body: JSON.stringify({
        userId,
        statusId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});
