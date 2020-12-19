const getConfByEnv = async (env: string): Promise<any> => {
    return require(`../conf/${env}`).default
}
export default async () => {
    const all = require("../conf/cmn").default
    const env = await getConfByEnv(process.env.NODE_ENV).catch(_ => ({}))
    return {
        ...all,
         ...env
        }
}
