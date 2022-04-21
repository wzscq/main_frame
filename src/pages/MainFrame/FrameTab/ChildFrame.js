import { useCallback, useEffect,useRef} from "react";

import { FRAME_MESSAGE_TYPE } from '../../../operation';
import {parseUrl} from '../../../utils/urlParser';

const frameType="tabframe";

export default function ChildFrame({item}){
    const refFrame=useRef();

    const onFrameLoad=useCallback(()=>{
        if(refFrame.current){
            const url=parseUrl(item.url);
            refFrame.current.contentWindow.postMessage({type:FRAME_MESSAGE_TYPE.INIT,data:{...item,frameType:frameType}},url.origin);
        }
    },[refFrame,item]);

    useEffect(()=>{
        if(refFrame.current){
            refFrame.current.addEventListener("load",onFrameLoad);
            const removeEventListener=refFrame.current.removeEventListener;
            return ()=>{
                removeEventListener("load",onFrameLoad);
            }
        }
    },[refFrame,onFrameLoad]);

    return (
        <iframe title={frameType+"_"+item.key} id={frameType+"_"+item.key} ref={refFrame} frameBorder={0} scrolling={"yes"} src={item.url} />
    )
}