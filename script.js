const axois = require("axios"); // library to nake https request.
const apiKey = ""; // api key.

const encodeUrlToBase64 = (url) => {
  return Buffer.from(url).toString("base64"); // encodes the link into a readable format for the api.
};

let linkinfo = async (url) => {
  let encodedUrl = encodeUrlToBase64(url);
  let endpoint = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;
  console.log(endpoint);

  try {
    let response = await axois.get(endpoint, {
      headers: {
        "x-apikey": apiKey,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(
      "Error obtaining link report:",
      error.response ? error.response.data : error.message
    );
  } // returns the results and provides error logging.
}; // returns information about the scanned link.

linkinfo("https://www.google.com"); // function call, note: replace with a onclick button function later.
