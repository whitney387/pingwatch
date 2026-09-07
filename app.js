document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("checkBtn");
  const domainInput = document.getElementById("domainInput");
  const resultsCard = document.getElementById("resultsCard");
  const targetDomain = document.getElementById("targetDomain");
  const statusBadge = document.getElementById("statusBadge");
  const responseTimeText = document.getElementById("responseTimeText");
  const reportBtn = document.getElementById("reportBtn");
  const reportCountDisplay = document.getElementById("reportCount");

  let reportCounter = 0;

  checkBtn.addEventListener("click", () => {
    let domain = domainInput.value.trim();

    if (!domain) return;

    // Clean domain input
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, "");

    targetDomain.textContent = domain;
    resultsCard.style.display = "block";
    statusBadge.textContent = "Ping-testing...";
    statusBadge.className = "status-badge";
    responseTimeText.textContent = "";
    reportCounter = 0;
    reportCountDisplay.textContent = `${reportCounter} reports logged today`;

    const startTime = performance.now();

    // Perform fetch ping using no-cors mode to verify server responsiveness
    fetch(`https://${domain}`, { mode: "no-cors", cache: "no-cache" })
      .then(() => {
        const endTime = performance.now();
        const duration = Math.round(endTime - startTime);

        statusBadge.textContent = "● Service Operational";
        statusBadge.className = "status-badge online";
        responseTimeText.textContent = `Response latency: ~${duration}ms`;
      })
      .catch(() => {
        statusBadge.textContent = "● Service Unreachable / Outage";
        statusBadge.className = "status-badge offline";
        responseTimeText.textContent = "Unable to resolve endpoint connection.";
      });
  });

  reportBtn.addEventListener("click", () => {
    reportCounter += 1;
    reportCountDisplay.textContent = `${reportCounter} report(s) logged today`;
    alert("Your outage report has been submitted!");
  });
});