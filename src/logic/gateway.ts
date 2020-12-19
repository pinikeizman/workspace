import * as Primus from 'primus';
import { merge, fromEvent } from 'rxjs'
import { filter, mergeMap, map } from 'rxjs/operators'
import workspaceStore from '../modules/workspace/store'

export enum ActionType { GetWorkspaces, Empty }

export class Action<T> {
    type: ActionType
    msg?: T

    constructor(type: ActionType, msg?: T){
        this.type = type
        this.msg = msg
    }
    static fromData<T>(type: keyof typeof ActionType, data?: T) {
        switch(ActionType[type]){
            case ActionType.GetWorkspaces:
                return new Action(ActionType.GetWorkspaces, data)
            default:
                return new Action(ActionType.Empty)
        }
    }
}

export const handleAction = async (action: Action<object>) => {
    switch(action.type){
        case ActionType.GetWorkspaces:
            return new Action(ActionType.GetWorkspaces,
                 await workspaceStore.getWorkspaces())
        default:
            return new Action(ActionType.Empty)
    }
}

export const handleClient = (ws: Primus.Spark) =>  {
    const actionResponse$ = fromEvent<[{type: keyof typeof ActionType, data?: object }]>(ws, 'data')
        .pipe(map(([data]) => data))
        .pipe(map(actionObj => Action.fromData<object>(actionObj.type, actionObj.data)))
        .pipe(filter(action => {
            return ActionType[action.type] !== undefined
        }))
        .pipe(mergeMap(handleAction))
    const workspaceUpdates$ = workspaceStore.subject.pipe(map(x => new Action(ActionType.GetWorkspaces, x)))
    merge(actionResponse$, workspaceUpdates$)
    .subscribe(workspaces => {
        ws.write(workspaces)
    })
}
