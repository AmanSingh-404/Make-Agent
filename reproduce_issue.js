const axios = require('axios');

async function testApi() {
    try {
        const response = await axios.post('http://localhost:3000/api/generate-agent-tool-config', {
            jsonConfig: {
                test: "data"
            }
        });
        console.log("Success:", response.data);
    } catch (error) {
        console.error("Error Status:", error.response ? error.response.status : error.message);
        console.error("Error Data:", error.response ? error.response.data : "No data");
    }
}

testApi();
