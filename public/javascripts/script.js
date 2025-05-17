const apiKey =
  "88ac944d77fdb08802f25461752b10804bd0454b070f441b5249208d6a320667"; // api key.

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
