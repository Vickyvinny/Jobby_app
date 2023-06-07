import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {detailsOfProfile: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  onRetry = () => {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApi = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updateProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        detailsOfProfile: updateProfileDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileCard = () => {
    const {detailsOfProfile} = this.state
    const {name, profileImageUrl, shortBio} = detailsOfProfile
    return (
      <>
        <div className="profile-container">
          <img src={profileImageUrl} alt="profile" />
          <h1 className="profile-heading">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="profile-loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onRetry}
      >
        Retry
      </button>
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileCard()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderResult()}</div>
  }
}

export default ProfileCard
