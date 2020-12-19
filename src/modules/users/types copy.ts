export enum Status {
    "offline",
    "preparing",
    "ready",
    "terminated",
    "deleted"
}

export interface Workspace {
    id: string
    eventId: string
    owner: string
    status: Status
    createdAt: Date
}