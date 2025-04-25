import axios from "axios"; // library to make https request.
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

linkinfo("google.com"); // function call, note: replace with a onclick button function later.
