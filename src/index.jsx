import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const MaintenanceMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 space-y-6 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h1 className="text-3xl font-bold text-gray-800">
          WILL BE BACK SOON
        </h1>
        <p className="text-lg text-gray-600">
          We're currently performing some maintenance to improve your experience.
          Our team is working hard to get everything back up and running.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <span className="text-blue-700">Expected downtime: 30 minutes</span>
        </div>
        <div className="pt-6 border-t border-gray-200">
          <p className="text-gray-500">
            Thank you for your patience!
          </p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MaintenanceMessage />
  </React.StrictMode>
)
