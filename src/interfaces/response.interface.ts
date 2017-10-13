export interface RenewTokenResponse{
  NewToken: string
  ExpirationInMinutes: number
  Success: boolean
  OperationReport: Array<any>
}

export interface UserAuthenticationResponse{
  AuthenticationToken: string
  TokenExpirationInMinutes: number
  UserKey: string
  Name: string
  Success: boolean
}
