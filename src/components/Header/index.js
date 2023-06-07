import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsBagFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <nav className="nav-container">
        <div className="desk-top-view">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-desk-top-logo"
            />
          </Link>

          <ul className="nav-un-order-items">
            <Link to="/" className="nav-link">
              <li className="nav-items">Home</li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li className="nav-items">Jobs</li>
            </Link>
          </ul>
          <button type="button" className="log-out-button" onClick={onLogOut}>
            Logout
          </button>
        </div>
        <div className="mobile-nav-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-log-mobile-view"
          />
          <div>
            <ul className="flex-icon-container">
              <Link to="/">
                <li>
                  <AiFillHome className="icon-style" />
                </li>
              </Link>
              <Link to="/jobs">
                <li>
                  <BsBagFill className="icon-style" />
                </li>
              </Link>
              <li>
                <FiLogOut className="icon-style" onClick={onLogOut} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
