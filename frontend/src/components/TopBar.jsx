import { useNavigate } from "react-router-dom"

function TopBar() {
  const navigate = useNavigate()
  const signOut = () => {
    localStorage.removeItem('token')
    navigate('/signin', {
      replace: true
    })
  }
  return (
    <header className="flex justify-between px-6 py-2 items-center border-b">
        <div>
          <span className="font-bold text-lg">Fintech App</span>
        </div>
        <div className="flex items-center">
          <div className="pr-4">Hi! User</div>
          <button className="border rounded-md px-4 py-1 hover:text-white hover:bg-blue-600" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </header>
  )
}

export default TopBar