import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import SkillsCard from '../SkillsCard'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDetailsData: {},
    similarJobsData: [],
    skillsData: [],
    aboutCompany: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const JobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(JobDetailsApi, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updateData
      const updateJobDetails = {
        id: jobDetails.id,
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
      }
      const {skills, lifeAtCompany} = updateJobDetails
      const updateSkills = skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const updateCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const updateSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetailsData: updateJobDetails,
        similarJobsData: updateSimilarJobs,
        skillsData: updateSkills,
        aboutCompany: updateCompany,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetails = () => {
    const {
      jobDetailsData,
      similarJobsData,
      skillsData,
      aboutCompany,
    } = this.state
    console.log(similarJobsData)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
    } = jobDetailsData
    const {description, imageUrl} = aboutCompany

    return (
      <div className="job-item-bg">
        <div className="item-card-container">
          <div className="item-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="item-company-image"
            />
            <div className="item-heading-container">
              <h1 className="item-card-heading">{title}</h1>
              <div className="item-star-container">
                <AiFillStar className="item-star" />
                <p className="item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="item-details-container">
            <div className="list-items-container">
              <div className="item-icons-container">
                <MdLocationOn className="item-icon-style" />
                <p className="item-name-style">{location}</p>
              </div>
              <div className="item-icons-container">
                <BsBriefcase className="item-icon-style" />
                <p className="item-name-style">{employmentType}</p>
              </div>
            </div>
            <p className="item-package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="link-container">
            <h1 className="item-card-description-heading">Description</h1>
            <button type="button" className="link-button">
              <a
                href={companyWebsiteUrl}
                className="visit-link"
                target="_blank"
                rel="noreferrer"
              >
                Visit
                <FiExternalLink className="link-icon" />
              </a>
            </button>
          </div>

          <p className="item-card-description">{jobDescription}</p>
          <div>
            <h1 className="item-card-description-heading">Skills</h1>
            <ul className="skills-list">
              {skillsData.map(eachSkill => (
                <SkillsCard eachSkill={eachSkill} key={eachSkill.name} />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="item-card-description-heading">Life at Company</h1>
            <div className="company-container">
              <p className="item-card-description">{description}</p>
              <img src={imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-card-main-heading">Similar Jobs</h1>
          <ul className="similar-card-main-container">
            {similarJobsData.map(eachData => (
              <SimilarJobs eachData={eachData} key={eachData.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobItemLoader = () => (
    <div data-testid="loader" className="job-item-loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  renderJobItemFailure = () => (
    <div className="job-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description ">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  JobItemResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderJobItemFailure()
      case apiStatusConstants.inProgress:
        return this.renderJobItemLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.JobItemResult()}</div>
      </>
    )
  }
}
export default AboutJobItem
