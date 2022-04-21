import FunctionMenu from './FunctionMenu';
import SystemMenu from './SystemMenu';
import OperationDialog from '../../../operation';
import Logo from './Logo';
import './index.css';

export default function FrameHeader(){
    return (
        <div className="frame-header">
            <div className="logo">
                <Logo/>
            </div>
            <div className="function-menu">
                <FunctionMenu/>
            </div>
            <div className="system-operation-bar">
                <OperationDialog/>
            </div>
            <div className="system-menu">
                <SystemMenu/>
            </div>
        </div>
    )
}