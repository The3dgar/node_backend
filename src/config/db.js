import { connect, startSession } from 'mongoose'

const db = {
  initConnection: async () => {
    await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('DB online')
  },
  startSession
}

export default db
