/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
/*
用来管理头部标题的reducer函数
 */
// import Vue from 'vue'

import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER
} from './mutation-types'

export default {
  [SET_HEAD_TITLE] (state, { headTitle }) {
    state.headTitle = headTitle
  },
  [RECEIVE_USER] (state, { user }) {
    state.user = user
  },
  [SHOW_ERROR_MSG] (state, { errorMsg }) {
    state.errorMsg = errorMsg
  },
  [RESET_USER] (state) {
    state.user = {}
  }
}
