import React, { useEffect, useState } from 'react'
import { AppstoreOutlined, BookOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const { Header, Sider, Content } = Layout

interface layoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<layoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const location = useLocation()
  const [clickMenu, setClickMenu] = useState<string | undefined>(location.pathname)
  const navigate = useNavigate()
  useEffect(() => {
    if (location) {
      setClickMenu(location.pathname)
    }
  }, [location, location.pathname])
  const handleClick = (e: any) => {
    setClickMenu(e.key)
    navigate(e.key)
  }

  return (
    <Layout className='' style={{ height: 925 }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          onClick={(e) => handleClick(e)}
          selectedKeys={[clickMenu || '']}
          items={[
            {
              key: '/admin/categories',
              icon: <AppstoreOutlined rev='exampleValue' />,
              label: 'Categories'
            },
            {
              key: '/admin/products',
              icon: <BookOutlined rev='exampleValue' />,
              label: 'Products'
            },
            {
              key: '/admin/users',
              icon: <UserOutlined rev='exampleValue' />,
              label: 'Users'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined rev='exampleValue' /> : <MenuFoldOutlined rev='exampleValue' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
