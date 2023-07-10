import { Button, Form, Input } from 'antd'
import React from 'react'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'

const layout = {
  labelCol: { span: 4 },
}

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const loginHandle = () => {
    form
      .validateFields({ validateOnly: false })
      .then(({ username, password }) => {
        if (username === 'wjq' && password === 'wangjq111') {
          navigate('/Index')
        }
      })
      .catch(() => {})
  }

  return (
    <div className={styles['login']}>
      <h1 className={styles['login-title']}>登录</h1>
      <Form {...layout} form={form}>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </Form>
      <Button type="primary" className={styles['login-btn']} onClick={loginHandle}>
        登录
      </Button>
    </div>
  )
}

export default Login
