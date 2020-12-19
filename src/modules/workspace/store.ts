import * as rxjs from 'rxjs'
import WorkspaceModel from '../workspace/model'
import { Workspace } from './types';


const subject = new rxjs.Subject<Workspace[]>();

export default {
    getWorkspaces(): Promise<Workspace[]> {
        return WorkspaceModel.find({}).exec()
        .then(docs => docs.map(doc =>  doc._doc));
    },
    async saveWorkspace(workspace: Workspace): Promise<Workspace> {
        const doc = await (new WorkspaceModel(workspace)).save()
        subject.next(await this.getWorkspaces())
        return doc._doc
    },
    subject
}