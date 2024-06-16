import { AuthenticatorTransportFuture, Base64URLString, CredentialDeviceType, PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';
import { OrderedCard, Table } from './game';

export type Handler<Dependencies, Parameters, Result> = (
	d: Dependencies,
) => (p: Parameters) => Result;

export type User = {
	name: string;
};

export type Seat = {
	user: User | null,
	isRe: boolean,
	hand: Array<OrderedCard>
}

export type Passkey = {
	id: string;
	publicKey: Uint8Array
	user: string
	webAuthnUserId: Base64URLString
	counter: number
	deviceType: CredentialDeviceType
	backedUp: boolean
	transports?: Array<AuthenticatorTransportFuture>
}

export type StoredKeyCredentialCreationOptions = {
	user: string,
	options: PublicKeyCredentialCreationOptionsJSON
}

export type Game = {
	id: string;
	rounds: Array<Table>;
	seats: Array<Seat>;
	activeSeat: number;
};
