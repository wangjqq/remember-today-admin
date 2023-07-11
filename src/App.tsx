import React, { startTransition, useEffect, useState } from 'react'
import './App.css'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'
import { SettingOutlined, HomeOutlined, ContainerOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]

const { Sider, Content } = Layout

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}
const items: MenuProps['items'] = [
  getItem('主页', '/Home', <HomeOutlined />),
  getItem('系统', 'sub1', <SettingOutlined />, [
    getItem('系统概览', '/SystemOverview'),
    getItem('系统日志', '/SystemLog'),
  ]),
]

const App: React.FC = () => {
  const elements = useRoutes(routes)
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState('/Home')

  useEffect(() => {
    setSelectedKeys(location.pathname)
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    startTransition(() => {
      navigate(e.key)
    })
  }

  return (
    <div className="App">
      <Layout>
        <Layout hasSider>
          <Sider theme="light">
            <Menu
              onClick={onClick}
              defaultSelectedKeys={['/Home']}
              selectedKeys={[selectedKeys]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Content className="App-Content">{elements}</Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
