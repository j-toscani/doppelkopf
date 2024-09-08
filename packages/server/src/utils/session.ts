import Elysia, { Cookie } from "elysia"

function hasSession(session?: Cookie<string | undefined>): boolean {
    return !!session
}

function validateSession(session: Cookie<string | undefined>): boolean {
    return true
}

export function addSessionGuard<BasePath extends string, Scoped extends boolean>(app: Elysia<BasePath, Scoped>) {
    app.guard({
        beforeHandle({set, cookie: { session } = {}}) {
            if (!hasSession(session) || !validateSession(session)) {
                return (set.status = 'Unauthorized')
            }
        }
    })
}