import { Schema, Document, model } from 'mongoose';
import { Workspace, Status } from './types'
interface WorkspaceDoc extends Document<Workspace>{
  _doc: Workspace
}

export const WorkspaceSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  owner: { type: String, required: true },
  status: { type: String, required: true, enum: Object.values(Status) },
  createdAt: { type: String, required: true}
});

// Export the model and return your IUser interface
export default model<WorkspaceDoc>('Workspace', WorkspaceSchema);