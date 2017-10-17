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
   * Creates a membership between the user and the application
   * @param email Email of the user to be associated
   * @param fullName Name of the user to be associated
   * @param comment Any comment about the user in your application
   */
  public addUser (
    email: string,
    fullName: string,
    comment?:string):
    Promise<BasicReponse> {
    const endpoint = `/users/${email}`
    const body = {
      fullName,
      comment: comment || ''
    }

    return this.request.put(endpoint, body)
      .then((result: any) => {
        return result.data
      })
  }

  public deleteUser (email: string) : Promise<BasicReponse> {
    const endpoint = `/users/${email}`
    return this.request.delete(endpoint)
      .then((result:any) => result.data)
  }

  public dissociateUserFromRole (email: string, roleName: string) : Promise<BasicReponse> {
    const endpoint = `/users/${email}/roles/${roleName}`
    return this.request.delete(endpoint)
      .then((result:any) => result.data)
  }

  public  activateUser (email:string): Promise<BasicReponse> {
    const endpoint = `/users/${email}`
    const body = {
      patches:[{
        op: 'replace',
        path: '/active',
        value: true
      }]
    }

    return this.request.patch(endpoint, body)
      .then((result:any) => result.data)
  }

  public  deactivateUser (email:string): Promise<BasicReponse> {
    const endpoint = `/users/${email}`
    const body = {
      patches:[{
        op: 'replace',
        path: '/active',
        value: false
      }]
    }

    return this.request.patch(endpoint, body)
      .then((result:any) => result.data)
  }
}
