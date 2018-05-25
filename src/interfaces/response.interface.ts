export interface BasicReponse {
  Success: boolean
  OperationReport: [any]
}

export interface RenewTokenResponse extends BasicReponse{
  NewToken: string
  ExpirationInMinutes: number
}

export interface UserAuthenticationResponse extends BasicReponse{
  AuthenticationToken: string
  TokenExpirationInMinutes: number
  UserKey: string
  Name: string
}

export interface ValidateTokenResponse extends BasicReponse {
  ExpirationInMinutes: number
}

export interface UserRolesReponse extends BasicReponse {
  roles: [any]
}

export interface AppRolesReponse extends BasicReponse {
  roles: 
  [
    {
      roleName:string,
      description:string,
      active:string
    }
  ],
  InternalExecutionTime : number
  ExternalExecutionTime : number
  TotalExecutionTime : number
  RequestKey : string

}

export interface AddUser extends BasicReponse {
  userKey: string
}

export interface GetUserResponse{
  user: {
    userKey:string
    email: string
    name: string,
    comment: string
    active: boolean
    lockedOut: false
    roles: [string]
  },
  Success: boolean,
  OperationReport: [string]
}

export interface ValidateClientAPIResponse extends BasicReponse {
  roles:[any];
  InternalExecutionTime: number,
  ExternalExecutionTime: number,
  TotalExecutionTime: number
}