import { configureStore } from '@reduxjs/toolkit'

import tabReducer from './tabSlice';
import loginReducer from './loginSlice';
import operationReducer from './operationSlice';
import dialogReducer from './dialogSlice';
import requestReducer from './requestSlice';
import logReducer from './logSlice';

export default configureStore({
  reducer: {
    login:loginReducer,
    tab:tabReducer,
    operation:operationReducer,
    dialog:dialogReducer,
    request:requestReducer,
    log:logReducer
  }
});