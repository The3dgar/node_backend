import db from "../config/db"

const sessionHelper = {
  startTransation: async () => {
    const session = await db.startSession()
    session.startTransaction()
    return session
  }
}

export default sessionHelper
