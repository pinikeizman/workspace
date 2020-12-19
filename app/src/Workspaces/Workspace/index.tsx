import * as React from 'react';
import { User, WSClient as WSClientType} from "../../types";
import { Workspace } from "../../../../src/modules/workspace/types";
import { Action, ActionType } from "../../../../src/logic/gateway";
import * as WSClient from '../../websocket/client';
import './index.sass';
import {useEffect, useState} from "react";
import Col from '../Row';

export interface WorkspaceProps {
    user: User
}

const WrokspaceComp = (props: {workspace: Workspace }) => (
        <Col className='workspace' key={props.workspace.id}>
            {
                Object.entries(props.workspace)
                .map(([key, value]) => <div key={value}>
                        <span className='workspace__label'>{key}:</span>
                        <span className='workspace__value'>{value}</span>
                    </div>)
            }           
        </Col>
    )

const WorkspacesCom: React.FC<WorkspaceProps> = (props: WorkspaceProps) => {
    const {user} = props;
    const [wsClient, setWSClient] = useState<WebSocket>(null);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [lastUpdate, setLastUpdate] = useState<Date>(undefined);

    useEffect(() => {
        const client = WSClient.createWSClient(user);
        setWSClient(client);
        return () => {
            client.close();
        }
    }, [true]);

    useEffect(() => {
        if (wsClient) {
            const cb = (event: MessageEvent) => {
                const action: Action<Workspace[]> = JSON.parse(event.data)
                if(action.type === ActionType.GetWorkspaces){
                    setWorkspaces([ ...action.msg ]);
                    setLastUpdate(new Date())
                }
            };
            wsClient.onmessage = cb;
        }
    }, [workspaces, wsClient]);

    useEffect(() => {
        if (wsClient) {
            wsClient.addEventListener('open', getWorkspaces) 
        }
    }, [wsClient]);

    const getWorkspaces = () => {
        wsClient.send(JSON.stringify({type: ActionType[ActionType.GetWorkspaces]}))
    };

    return (
        <>
            <div className='workspaces__header'>
                <h3>Logged in as: {user.userName}</h3>
                <p>Last update: {(lastUpdate || new Date()).toISOString()}</p>
            </div>
            <div className='workspaces scrollable'>
                {
                    workspaces
                    .map(workspace => WrokspaceComp({workspace}))
                }
            </div>
        </>
    );
};

export default WorkspacesCom;
