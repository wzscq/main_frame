import {LoadingOutlined,CheckCircleOutlined} from '@ant-design/icons';
import {
    OP_RESULT
} from "./constant";

export default function OpertaionItem({item,state}){
    let icon=null;

    console.log("OpertaionItem",item);
    
    if(state===1){
        icon=<LoadingOutlined />
    }
    if(state===2){
        icon=<CheckCircleOutlined twoToneColor="#52c41a"/>
    }
    return (
        <div>
            {icon}
            <span>{item.description}</span>
            {item.result===OP_RESULT.ERROR?
                (<>
                    <br/>
                    <span style={{color:"red"}}>{"出错啦，"}{item.message}{item.errorCode}</span>
                </>):null}
        </div>
    );
}