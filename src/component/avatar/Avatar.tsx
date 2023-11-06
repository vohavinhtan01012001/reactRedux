import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export default function AvatarCusTome() {
  return (
    <div className='flex flex-wrap gap-2'>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined rev='exampleValue' />} />
    </div>
  )
}
