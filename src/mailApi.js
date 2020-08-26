import axios from 'axios';


const mailApi = axios.create({
    baseURL: 'https://ccopo4agr5.execute-api.us-east-1.amazonaws.com/default/',
    headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/json',
	}
});

export default mailApi;