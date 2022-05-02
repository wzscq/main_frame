import { Menu} from 'antd';
import { AppstoreFilled } from '@ant-design/icons';

import { getHost } from '../../../api';
import { createOpenOperation,setOperation,OPEN_LOCATION } from '../../../operation';
import { useEffect } from 'react';

export default function FunctionMenu(){
    const handleClick=(e)=>{
        const key=e.key;
        const host=getHost();
        let params={
            url:host+key,
            title:"",
            key,
            location:OPEN_LOCATION.TAB
        }
        if(key==="/functions"){
            params.title="功能列表";
            params.url=process.env.REACT_APP_FUNCTION_LIST_URL 
            //params.url="http://localhost:3001";
        }

        if(key==="/log"){
            params.title="Operation Log";
        }
        const operationItem=createOpenOperation(params,{},"开发功能页面");
        setOperation(operationItem);
    }

    useEffect(()=>{
        const params={
            url:process.env.REACT_APP_FUNCTION_LIST_URL,
            title:"功能列表",
            key:"/functions",
            location:OPEN_LOCATION.TAB
        };
        const operationItem=createOpenOperation(params,{},"开发功能页面");
        setOperation(operationItem);
    });

    return (
        <Menu onClick={handleClick} selectedKeys={["mail"]} mode="horizontal">
            <Menu.Item key="/functions" icon={<AppstoreFilled />}>
                功能列表
            </Menu.Item>
            {/*<Menu.Item key="/log" icon={<FileTextOutlined />}>
                操作日志
            </Menu.Item>*/}
        </Menu>
    )
}