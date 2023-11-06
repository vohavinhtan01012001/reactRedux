import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // Import CSS styles

const customToastStyle = {
    
}

function ToastCustom() {
  return (
    <div>
      <ToastContainer style={customToastStyle} />
    </div>
  )
}

export default ToastCustom
