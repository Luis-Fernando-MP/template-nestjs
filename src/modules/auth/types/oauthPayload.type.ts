import strategies from './strategies.enum'

type IOauthPayload = {
	provider: strategies
	email: string
	name: string
	photo: string
}
export default IOauthPayload
