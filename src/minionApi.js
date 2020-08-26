import axios from 'axios';


const minionApi = axios.create({
    baseURL: 'https://fwcvficonb.execute-api.us-east-1.amazonaws.com/default/',
    headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/json',
	}
});

export default minionApi;