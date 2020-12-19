import mongoose, { Schema, Document } from 'mongoose';
import { User } from './types'
interface UserDoc extends Document<User>{
  _doc: User
}

export const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true }
});

// Export the model and return your IUser interface
export default mongoose.model<UserDoc>('User', UserSchema);