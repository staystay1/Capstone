const apiKey = ""; // api key.

let linkinfo = async (url) => {
  const encodedUrl = Buffer.from(url).toString("base64").replace(/=+$/, "");
  const endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;
  console.log("Endpoint:", endpoint);

  try {
    const response = await axios.get(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error(
      "Error obtaining link report:",
      error.response ? error.response.data : error.message
    );
  }
};

function handleLinkInfo() {
  const urlInput = document.getElementById("urlInput").value;
  if (urlInput) {
    console.log(linkinfo(urlInput)); // Call the linkinfo function with the input value
  } else {
    console.error("Please enter a valid URL.");
  }
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
