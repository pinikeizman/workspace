import * as React from 'react';
import Login from "./Login";
import {User} from "../types";
import Workspace from "./Workspace";
import './index.sass'

function Workspaces() {
    const [user, setUser] = React.useState<User>(null);

    return (
        <>
            <h1>Aweosome WorkSpaces app!</h1>
            {
                user ? <Workspace user={user}/> : <Login onLogin={(user)=>setUser(user)}/>
            }
        </>
    );
}

export default Workspaces;


