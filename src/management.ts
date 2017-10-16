import {
  UserRolesReponse,
  BasicReponse
} from './interfaces/response.interface'
import axios from 'axios'

export class Management{
  request: any

  constructor (private applicationKey: string, apiKey: string, private baseURL: string) {
    this.baseURL = `${this.baseURL}/management/${applicationKey}`
    this.request = axios.create({
      baseURL: `${this.baseURL}`,
      timeout: 5000,
      headers: { Authorization: `bearer ${apiKey}` }
    })
  }

  /**
   * List all the roles that are associated with a specific user.
   * @param email user email to be authenticated
   */
  public getUserRoles (email: string): Promise<UserRolesReponse> {
    const endpoint = `/users/${email}/roles`

    return this.request.get(endpoint)
      .then((result: any) => {
        return result.data
      })
  }

  /**
   * Creates an association between the specified roles and user.
   * @param email user email to be authenticated
   * @param roles array to associate to user
   */
  public associateRolesToUser (email: string, roles: string[]): Promise<BasicReponse> {
    if (!(roles && roles.length)) {
      return Promise.reject(new Error('You must provide roles'))
    }

    const endpoint = `/users/${email}/roles`
    const body = { roles }

    return this.request.post(endpoint, body)
      .then((result: any) => {
        return result.data
      })
  }

  /**
   * Associates a user to your application.
   * @param email user email to be authenticated
   * @param roles array to associate to user
   */
  public addUser (
    email: string,
    fullName: string,
    password: string,
    comment?:string):
    Promise<BasicReponse> {
    const endpoint = `/user/${email}`
    const body = {
      fullName,
      password,
      comment: comment || ''
    }

    return this.request.post(endpoint, body)
      .then((result: any) => {
        return result.data
      })
  }
}
