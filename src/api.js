import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {

    // the token for interactive with the API will be stored here.
    //   static token

    static async request({ endpoint, token, data = {}, method = "get" }) {
        console.debug("API Call:", endpoint, data, method, token);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle, token) {
        let res = await this.request({ endpoint: `companies/${handle}`, token: token });
        return res.company;
    }

    static async getCompanies(token) {
        console.log('in getCompanies', token)
        let res = await this.request({ endpoint: 'companies', token: token })
        return res.companies
    }

    static async getFilteredCompanies(filter, token) {
        let res = await this.request({ endpoint: `companies`, token: token, data: { name: filter } })
        return res.companies
    }

    static async getJobs(token) {
        let res = await this.request({ endpoint: 'jobs', token: token })
        return res.jobs
    }

    static async getFilteredJobs(filter, token) {
        let res = await this.request({ endpoint: `jobs`, token: token, data: { title: filter } })
        return res.jobs
    }

    static async register(newUserRegistrationInfo) {
        console.log('in api.js, register, newUserRegistrationInfo', newUserRegistrationInfo)
        let res = await this.request({ endpoint: 'auth/register', data: newUserRegistrationInfo, method: 'post' })
        return res.token
    }

    static async login(userInfo) {
        let res = await this.request({ endpoint: 'auth/token', data: userInfo, method: 'post' });
        return res.token
    }

    static async getUser(username, token) {
        let res = await this.request({ endpoint: `users/${username}`, token: token })
        return res.user
    }

    static async updateUser(updatedUserInfo, username, token) {

        console.log('in api.js -> updateUser, updatedUserInfo is', updatedUserInfo)
        let res = await this.request({ endpoint: `users/${username}`, method: 'patch', token: token, data: updatedUserInfo })
        return res
    }

    static async applyToJob(username, jobId, token) {
        let res = await this.request({ endpoint: `users/${username}/jobs/${jobId}`, method: 'post', token: token })
        return res.applied
    }
    // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";



export { JoblyApi }