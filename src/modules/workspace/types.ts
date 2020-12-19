import * as uuid from 'uuid'
export enum Status {
    offline = "offline",
    preparing = "preparing",
    ready = "ready",
    terminated = "terminated",
    deleted = "deleted"
}

export class Workspace {
    id: string
    eventId: string
    owner: string
    status: Status
    createdAt: Date
    constructor(eventId: string, status: Status, owner: string ){
        this.id = uuid.v4();
        this.eventId = eventId;
        this.owner = owner;
        this.status = status;
        this.createdAt = new Date();
    }
}