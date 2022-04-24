import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd';

import {parseUrl} from '../utils/urlParser';
import {userInfoStorage} from '../utils/sessionStorage';
import {
  FRAME_MESSAGE_TYPE
} from "../operation/constant";

export const getHost=()=>{
    const rootElement=document.getElementById('root');
    const host=rootElement?.getAttribute("host");
    console.log("host:"+host);
    return host;
}
  
const host=getHost()+process.env.REACT_APP_SERVICE_API_PREFIX; //'/frameservice';

export const getLoginImage=(appID)=>{
  return host+"/appimages/"+appID+"/login.png";
}

export const getLogoImage=()=>{
  const {appID}=userInfoStorage.get();
  return host+"/appimages/"+appID+"/logo.png";
}

//login api
export const loginApi = createAsyncThunk(
    'login',
    async (param, _) => {
      const reponse= await axios({url:host+"/user/login",method:"post",data:param});
      console.log('login reponse',reponse);
      return reponse.data;
    }
)

//logout api
export const logoutApi = createAsyncThunk(
  'logout',
  async () => {
    const {token}=userInfoStorage.get();
    userInfoStorage.clear();
    const config={
      url:host+"/user/logout",
      method:'post',
      headers:{token:token}
    }
    const reponse= await axios(config);
    return reponse.data;
  }
)

//request api
export const requestAction = createAsyncThunk(
  'request',
  async ({url,method,data}, _) => {
    const {token}=userInfoStorage.get();
    const config={
      url:host+url,
      method,
      data:{...data},
      headers:{token:token}
    }
    const response =await axios(config);
    return response.data;
  }
)

//文件下载接口
const DOWNLOAD_FILE_URL="/data/download";
export const downloadAction = createAsyncThunk(
  'download',
  async ({data,fileName}, _) => {
    const {token}=userInfoStorage.get();
    const config={
      url:host+DOWNLOAD_FILE_URL,
      method:'post',
      data:{...data},
      headers:{token:token},
      responseType:'blob'
    }
    const response =await axios(config);
    return {data:response.data,fileName};
  }
)

//通用的查询接口，用于快速数据查询
const DATA_QUERY_URL="/data/query";
export const queryData = ({frameParams,queryParams})=>{
  const {token}=userInfoStorage.get();
  const config={
    url:host+DATA_QUERY_URL,
    method:'post',
    data:{...queryParams},
    headers:{token:token}
  }
  axios(config).then(function (response) {
    console.log(response);
    if(response.data.error===true){
      message.error(response.data.message);
    } else {
      const {frameID,frameType,dataKey}=frameParams;
      const frameControl=document.getElementById(frameType+"_"+frameID);
      if(frameControl){
          const origin=parseUrl(frameControl.getAttribute("src")).origin;
          frameControl.contentWindow.postMessage({
            type:FRAME_MESSAGE_TYPE.QUERY_RESPONSE,
            dataKey:dataKey,
            data:response.data.result},origin);
      }
    }
  })
  .catch(function (error) {
    console.log(error);
    message.error("查询数据时发生错误");
  });;
}