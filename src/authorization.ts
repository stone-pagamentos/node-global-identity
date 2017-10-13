import { UserAuthenticationResponse } from './interfaces/response.interface'

export  class Authorization {
  constructor (private applicationKey: string, private baseURL: string) {

  }

  /**
   *
   * @param email user email to be authenticated
   * @param password user password to be authenticated
   * @param tokenExpirationTime the duration of the auth token in minutes
   */
  public authenticateUser (email: string, password:string, tokenExpirationTime = 2880) {

  }

}
