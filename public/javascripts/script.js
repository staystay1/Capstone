/*

const axios = window.axios;


let linkinfo = async (url) => {
  const encodedUrl = btoa(url).replace(/=+$/, "");
  const endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;
  console.log("Endpoint:", endpoint);

  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = `<p>Loading data for the provided link...</p>`;

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });

    const suspiciousData =
      response.data?.data?.attributes?.last_analysis_stats?.suspicious || 0;
    const maliciousData =
      response.data?.data?.attributes?.last_analysis_stats?.malicious || 0;
    const harmlessData =
      response.data?.data?.attributes?.last_analysis_stats?.harmless || 0;
    const undetectedData =
      response.data?.data?.attributes?.last_analysis_stats?.undetected || 0;
    const url = response.data?.data?.attributes?.url || "Unknown";

    outputDiv.innerHTML = `
      <p>URL: ${url}</p>
      <p>Malicious: ${maliciousData}</p>
      <p>Harmless: ${harmlessData}</p>
      <p>Suspicious: ${suspiciousData}</p>
      <p>Undetected: ${undetectedData}</p>
    `;
  } catch (error) {
    console.error(
      "Error obtaining link report:",
      error.response ? error.response.data : error.message
    );

    outputDiv.innerHTML = `<p style="color: red;">Error: Unable to fetch link info. Please try again.</p>`;
  }
};
*/

const axios = window.axios;

async function handleLinkInfo(event) {
  event.preventDefault();

  const urlInput = document.getElementById("urlInput").value;

  if (urlInput) {
    try {
      const response = await axios({
        url: "/",
        method: "POST",
        data: { txt: urlInput },
        headers: {
          "Content-Type": "application/json",
        },
      });

      await processData(response);
      /*
      await fetch("/", {
        method: "POST",
        body: JSON.stringify({ txt: urlInput }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          processData(data);
        });
        */

      // await linkinfo(urlInput);
    } catch (error) {
      console.error("Error handling link info:", error.message);
    }
  } else {
    console.error("Please enter a valid URL.");
  }
}

function processData(response) {
  // console.log("Response:", response);
  // console.log("Data:", response.data);

  // console.log(response);

  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = `<p>Loading data for the provided link...</p>`;

  const suspiciousData =
    response.data?.data?.attributes?.last_analysis_stats?.suspicious || 0;
  const maliciousData =
    response.data?.data?.attributes?.last_analysis_stats?.malicious || 0;
  const harmlessData =
    response.data?.data?.attributes?.last_analysis_stats?.harmless || 0;
  const undetectedData =
    response.data?.data?.attributes?.last_analysis_stats?.undetected || 0;
  const url = response.data?.data?.attributes?.url || "Unknown";

  outputDiv.innerHTML = `
      <p>URL: ${url}</p>
      <p>Malicious: ${maliciousData}</p>
      <p>Harmless: ${harmlessData}</p>
      <p>Suspicious: ${suspiciousData}</p>
      <p>Undetected: ${undetectedData}</p>
    `;

  // outputDiv.innerHTML = `<p style="color: red;">Error: Unable to fetch link info. Please try again.</p>`;
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
