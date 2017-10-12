import { Authorization } from "./authorization"

export default function GlobalIdentity(aplication_key: string){

    return {
        Authorization: new Authorization(aplication_key)
    }
}