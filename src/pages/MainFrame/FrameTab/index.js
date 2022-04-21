import { Tabs } from 'antd';
import { useEffect, useMemo } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import {setActiveTab,closeTab} from '../../../redux/tabSlice';
import {setActive} from '../../../redux/logSlice';
import LogTab from '../../../tabs/LogTab';
import ChildFrame from './ChildFrame';

import "./index.css";

export default function FrameTab(){
    const dispatch=useDispatch();
    const tab=useSelector(state=>state.tab);
    const { TabPane } = Tabs;

    const onChangeTab=(key)=>{
        dispatch(setActiveTab(key));  
    }

    const onEditTab=(key,action)=>{
        tab.items.forEach((item)=>{
            if(item.key===key){
                dispatch(closeTab(item));
            }
        });
    }

    const logTab=useMemo(()=>{
        return tab.items.find(item=>item.key==="/log");
    },[tab]);

    useEffect(()=>{
        //看一下logtab是否打开，只有在打开的情况下才记录日志，否则部记录日志
        if(logTab){
            dispatch(setActive(true));
        } else {
            dispatch(setActive(false));
        }
    },[logTab,dispatch]);

    return (
        <div className="frame-tab-main">
            <Tabs onChange={onChangeTab} onEdit={onEditTab} type="editable-card" hideAdd={true} activeKey={tab.current}>
            {
                tab.items.map((item)=>{
                    if(item.key==="/log"){
                        return (
                            <TabPane tab={item.title} key={item.key} closable={true}>
                                <LogTab/>
                            </TabPane>);
                    }

                    return (
                        <TabPane tab={item.title} key={item.key} closable={true}>
                            <ChildFrame  item={item}/>
                        </TabPane>
                    );
                })
            }
            </Tabs>
        </div>
    )
}