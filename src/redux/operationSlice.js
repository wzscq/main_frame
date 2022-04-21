import { createSlice } from '@reduxjs/toolkit';
import { message} from 'antd';
import {OP_RESULT} from '../operation';

const initialState = {
    //一组连续的操作中已经执行完成的操作列表
    doneList:[],   
    //当前正执行的操作
    current:null,
    needConfirm:false
}

export const operationSlice = createSlice({
    name: 'operation',
    initialState,
    reducers: {
        confirm:(state,action) =>{
            state.current=null;
            state.doneList=[];
            state.needConfirm=false;
        },
        setOperation: (state,action) => {
            //如果当前操作未完成则不允许设置新的操作
            console.log(action.payload);
            if(state.current){
                message.warning("当前操作尚未执行完成，请稍后再试！");
            } else {
                state.current=action.payload;
                state.doneList=[];
            }
        },
        operationPending:(state,action) => {
            state.current.params.pending=action.payload;
        },
        operationDone:(state,action) => {
            //如果当前操作未完成则不允许设置新的操作
            if(state.current){
                let {result,message,output}=action.payload;
                state.current.result=result;
                if(state.current.params?.pending){
                    state.current.params.pending=false;
                }
                state.current.output=output;
                state.current.message=message;
                state.doneList.push({...state.current});
                if(result===OP_RESULT.SUCCESS){
                    //执行成功    
                    state.current=state.current.successOperation;
                    if(state.current&&output){
                        state.current.input=output;
                    }
                } else {
                    //执行失败
                    state.current=state.current.errorOperation;
                    //执行失败，但是没有失败的后续操作，则需要用户确认后关闭操作信息对话框 
                    state.needConfirm=!(state.current)
                }
            } else {
                message.warning("执行操作完成更新时发现当前操作不存在！");
            }
        },
    }
});

// Action creators are generated for each case reducer function
export const { setOperation,operationDone,operationPending,confirm} = operationSlice.actions

export default operationSlice.reducer