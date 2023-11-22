const DEFAULT_PORT = 4000

const PORT = process.env.PORT ?? DEFAULT_PORT;
const ORIGIN = process.env.DEVELOPMENT ? true : process.env.ORIGIN;

export const environment = {
    PORT,
    ORIGIN
}