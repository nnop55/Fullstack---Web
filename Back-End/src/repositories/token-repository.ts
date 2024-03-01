import { setQuery } from "../services/database-service";

export class TokenRepository {
    public static async findToken(token: string): Promise<string | null> {
        return new Promise<string | null>((resolve, reject) => {
            setQuery('SELECT * FROM tokens_blacklist WHERE access_token = ?',
                [token], (err: any, result: any) => {
                    if (err) {
                        console.error('Error finding token:', err);
                        reject(err)
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);

                })
        })

    }
}