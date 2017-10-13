export interface RenewTokenResponse{
  NewToken: string
  ExpirationInMinutes: number
  Success: boolean
  OperationReport: [any]
}

export interface UserAuthenticationResponse{
  AuthenticationToken: string
  TokenExpirationInMinutes: number
  UserKey: string
  Name: string
  Success: boolean
}

export interface ValidateTokenResponse {
  ExpirationInMinutes: number
  Success: boolean
  OperationReport: [any]
}

export interface BasicReponse {
  Success: boolean
  OperationReport: [any]
}
