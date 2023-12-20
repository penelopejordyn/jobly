import axios from "axios";
import { TOKEN_STORAGE_ID } from '../App';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** JoblyApi - helper class that manages DB calls
 */
class JoblyApi {

  // all static functions call this one
  static async request(endpoint, params = {}, verb = "get") {

    const _token = localStorage.getItem(TOKEN_STORAGE_ID);

    // GET requires data to be keyed with 'params', otherwise send data w/ token
    const data = (verb === "get")
      ? { params: { _token, ...params } } // GET
      : { _token, ...params };           // POST,PATCH

    const req = axios[verb](`${BASE_URL}/${endpoint}`, data);

    try {
      return (await req).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // call server and register new user
  static async register({ username, password, first_name, last_name, email}) {

    let res = await this.request(
      'users',
      { username, password, first_name, last_name, email },
      "post"
    );
    return res.token;
  }

  // log in user
  static async logIn({ username, password }) {
    let res = await this.request('login', { username, password }, "post");
    return res.token;
  }

  // get list of jobs
  static async searchJobs(search) {
    let res = await this.request("jobs", { search });
    return res.jobs;
  }

  // get list of companies
  static async searchCompanies(search) {
    let res = await this.request("companies", { search });
    return res.companies;
  }

  // get single user
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // get a single company's data
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // update user profile info
  static async updateUser({ username, first_name, last_name, email, photo_url, password }) {
    let res = await this.request(
      `users/${username}`,
      { first_name, last_name, email, photo_url, password },
      "patch"
    );
    return res.user;
  }

  // apply to a job
  static async apply(id) {
    let res = await this.request(
      `jobs/${id}/apply`,
      {},
      "post"
    );
    return res.message;
  }
}

export default JoblyApi;