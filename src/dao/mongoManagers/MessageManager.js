import MsgRepository from "../../repositories/messages.repository.js"

const messageRepository = new MsgRepository()

export default class MessageManager{
    async getMsgs() {
        try {
            const msgs = await messageRepository.getMsgs()
            return msgs
        } catch (error) {
            return error
        }
    }

    async createMsg() {
        try {
            const msg = await messageRepository.createMsg(msg)
        } catch (error) {
            return error
        }
    }
}