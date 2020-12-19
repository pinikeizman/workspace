import { Request, Context } from '../libs/types';
import UserModel from '../modules/users/model'
import logging from '../libs/logging'

export default async (req: Request) => {
    const { username } = req.query
    if(!username){
        return Promise.reject({status: 401, message: 'username is missing.'})
    }
    const user = await UserModel
    .findOneAndUpdate({ username }, {}, { upsert: true, new: true })
    .exec()
    .catch(e => {
        logging.get().error('Error authenticating user.', e)
        throw e;
    })
    const context: Context = { user: user._doc }
    return context
}