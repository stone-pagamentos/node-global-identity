import { 
  UserRolesReponse,
  BasicReponse
} from './interfaces/response.interface'
import axios from 'axios'

export class Management{
  constructor (private applicationKey: string, apiKey: string, private baseURL: string) {
    this.baseURL = `/management/${applicationKey}`
  }

  private getURL (endpoint: string): string {
    return this.baseURL + endpoint
  }

  /**
   * List all the roles that are associated with a specific user.
   * @param email user email to be authenticated
   */
  public getUserRoles(email: string): Promise<UserRolesReponse>{
    const endpoint = `/user/${email}/roles`

    return axios.get(this.getURL(endpoint))
      .then(result => result.data)
  }

  /**
   * Creates an association between the specified roles and user.
   * @param email user email to be authenticated
   * @param roles array to associate to user
   */
  public associateRolesToUser(email: string, roles: Array<string>): Promise<BasicReponse>{
    if (!(roles && roles.length)) {
      return Promise.reject(new Error('You must provide roles'))
    }    
    
    const endpoint = `/user/${email}/roles`
    const body = { roles }

    return axios.post(this.getURL(endpoint), body)
      .then(result => result.data)
  }

  /**
   * Associates a user to your application.
   * @param email user email to be authenticated
   * @param roles array to associate to user
   */
  public addUser(email: string, fullName: string, password: string, comment?:string): Promise<BasicReponse>{
    const endpoint = `/user/${email}`
    const body = {
      fullName,
      password,
      comment: comment || '' 
    }

    return axios.post(this.getURL(endpoint), body)
      .then(result => result.data)
  }
}
