import EventEmitter from "events";
import { Database } from "../data-access/database";

export class VerificationEvent {
    private event: EventEmitter

    constructor(private db: Database) {
        this.event = new EventEmitter()

        this.event.on('verifySuccess', async (data) => {
            if (data['status'] != 1) {
                return
            }
            const sql = 'UPDATE users SET code = ? WHERE email = ?';
            try {
                return await new Promise<void>((resolve, reject) => {
                    setTimeout(() => {
                        this.db.setQuery(sql, [null, data['email']], async (err, result) => {
                            if (err) {
                                console.error('Error logging in:', err);
                                reject(err)
                                return;
                            }
                            resolve();
                        });
                    }, 180000)
                })

            } catch (err) {
                console.log(err)
            }
        })
    }

    public emitEvent(email: string) {
        this.event.emit('verifySuccess', { status: 1, email })
    }
}