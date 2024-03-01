import EventEmitter from "events";
import { setQuery } from "../services/database-service";

export class VerificationEvent {
    private event: EventEmitter

    constructor() {
        this.event = new EventEmitter()

        this.event.on('verifySuccess', async (data) => {
            if (data['status'] != 1) {
                return
            }
            const sql = 'UPDATE users SET code = ? WHERE email = ?';
            return await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    setQuery(sql, [null, data['email']], async (err, result) => {
                        if (err) {
                            console.error('Error logging in:', err);
                            reject(err)
                            return;
                        }
                        resolve();
                    });
                }, 180000)
            })
        })
    }

    public emitEvent(email: string) {
        this.event.emit('verifySuccess', { status: 1, email })
    }
}