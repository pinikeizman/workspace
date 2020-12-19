import express from 'express'
import store from './store'
import { Status, Workspace } from './types'
import { Request, Context } from '../../libs/types'
import logging from '../../libs/logging'

type RouteHandler = (req?: express.Request) => Promise<any>

interface WorkspacePostRequest {
    eventId: string
    status: Status
}

const routeWrapper = (handler: RouteHandler) =>
    async (req: express.Request,
           res: express.Response,
           next: express.NextFunction) => handler(req)
           .then(result => res.send(result))
           .catch(e => {
               logging.get().error(`Error in route: ${e.message}`, e)
               res.status(500).send(e)
           })
           .then(()=> next())

const router = express.Router()

const saveWorkspace = async(req: WorkspacePostRequest, context: Context) => {
    const workspace = new Workspace(req.eventId, req.status, context.user.username)
    // logging.get().info(JSON.stringify(workspace))
    return store.saveWorkspace(workspace)
}

const postWorkspace: RouteHandler = (req: Request) => {
    const workspace: WorkspacePostRequest = req.body
    const context: Context = req.context
    return saveWorkspace(workspace, context)
}

router.get('/workspaces', routeWrapper(store.getWorkspaces))
router.post('/workspaces', routeWrapper(postWorkspace))

export default router;