import Elysia, { t } from 'elysia';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';
import { environment } from '../environment';
import loginUser from '../controllers/loginUser';
import { PasskeyRepo, StoredKeyCredentialCreationOptionsRepo, UserRepo } from '../db/db';
import { BadRequestError, NotFoundError } from '../errors';
import { Passkey } from 'shared';

const app = new Elysia({ prefix: '/auth' });

// Check if User already registered with this Key!
app.get(
	'/register',
	async ({ body: { name: username } }) => {
		const options: PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions({
			rpName: environment.RP_NAME,
			rpID: environment.RP_NAME,
			userName: username,
			// Don't prompt users for additional information about the authenticator
			// (Recommended for smoother UX)
			attestationType: 'none',
			// See "Guiding use of authenticators via authenticatorSelection" below
			authenticatorSelection: {
				// Defaults
				residentKey: 'preferred',
				userVerification: 'preferred',
				// Optional
				authenticatorAttachment: 'platform',
			},
		});

		const user = UserRepo.create({ name: username });
		await UserRepo.insertOne(user);
		await StoredKeyCredentialCreationOptionsRepo.insertOne({ user: user.name, options });

		return options;
	},
	loginUser.context,
);

app.post('/register', async ({ body }) => {
	const { user: username, options } = body;
  const user = await UserRepo.findOne({name: username})
  const currentOptions = await StoredKeyCredentialCreationOptionsRepo.findOne({ user: username })

  if (!user || !currentOptions) throw new NotFoundError("No User with valid registration options found")

  try {
    const { verified, registrationInfo  } = await verifyRegistrationResponse({
      response: options,
      expectedChallenge: currentOptions?.options.challenge
    })

    if (verified) {
      const {
        credentialID,
        credentialPublicKey,
        counter,
        credentialDeviceType,
        credentialBackedUp,
      } = registrationInfo;
      
      const newPasskey: Passkey = {
        // `user` here is from Step 2
        user: username,
        // Created by `generateRegistrationOptions()` in Step 1
        webAuthnUserId: currentOptions.user,
        // A unique identifier for the credential
        id: credentialID,
        // The public key bytes, used for subsequent authentication signature verification
        publicKey: credentialPublicKey,
        // The number of times the authenticator has been used on this site so far
        counter,
        // Whether the passkey is single-device or multi-device
        deviceType: credentialDeviceType,
        // Whether the passkey has been backed up in some way
        backedUp: credentialBackedUp,
        // `body` here is from Step 2
        transports: options.response.transports,
      };

      await PasskeyRepo.insertOne(newPasskey)
    }

    return verified
  } catch (error: any) {
    throw new BadRequestError(error)
  }
}, {
  body: t.Object({
    user: t.String(),
    options: t.Any()
  })
});

export default app;
