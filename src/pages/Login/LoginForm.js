import { Card,Form,Input,Button } from 'antd';
import { useSelector,useDispatch } from 'react-redux';

import {encodePassword} from '../../utils/passwordEncoder';
import {loginApi} from '../../api';
import './LoginForm.css';

export default function LoginForm({appID}){
    const pending=useSelector(state=>state.login.pending);
    const dispatch = useDispatch();

    const onFinish = (values) => {
        //提交账号密码，获取用户token
        const loginParam={...values,password:encodePassword(values.password),appID:appID};
        dispatch(loginApi(loginParam));
    };
    
    const onFinishFailed = (errorInfo) => {
        
    };

    return (
        <div className="login-form">
            <Card title="登录">
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="账号"
                        name="userId"
                        rules={[{ required: true, message: '请输入登录账号!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 7, span: 0 }}>
                        <Button loading={pending} type="primary" htmlType="submit" >确定</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}