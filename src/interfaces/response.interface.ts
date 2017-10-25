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

export interface AddUser extends BasicReponse {
  userKey: string
}
