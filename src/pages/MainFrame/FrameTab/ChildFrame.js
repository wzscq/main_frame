import { useCallback, useEffect,useRef} from "react";

import { FRAME_MESSAGE_TYPE } from '../../../operation';
import {convertUrl, parseUrl} from '../../../utils/urlParser';

const frameType="tabframe";

export default function ChildFrame({item}){
    const refFrame=useRef();

    const onFrameLoad=useCallback(()=>{
        if(refFrame.current){
            const url=parseUrl(item.params.url);
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

    const url=convertUrl(item.params.url);

    return (
        <iframe 
            allowfullscreen={true}
            title={frameType+"_"+item.params.key} 
            id={frameType+"_"+item.params.key} 
            ref={refFrame} 
            frameBorder={0} 
            scrolling={"yes"} 
            src={url} />
    );
}