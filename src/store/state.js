/*
状态对象
 */
import storageUtils from '../utils/storageUtils'

const initUser = storageUtils.getUser()
export default {
  headTitle: initUser.headTitle,
  user: initUser.user,
  errorMsg: initUser.errorMsg
}
