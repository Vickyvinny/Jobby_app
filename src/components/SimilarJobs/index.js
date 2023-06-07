import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'

const SimilarJobs = props => {
  const {eachData} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = eachData
  return (
    <li className="similar-card-container">
      <div className="similar-card-image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-card-image "
        />
        <div>
          <div className="similar-card-heading-container">
            <h1 className="similar-card-heading">{title}</h1>
            <div className="similar-card-star-container">
              <AiFillStar className="similar-card-star" />
              <p className="similar-card-rating">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="similar-card-heading">Description</h1>
      <p className="similar-card-description ">{jobDescription}</p>
      <div className="similar-card-icons-container">
        <div className="similar-card-icon-name-container">
          <MdLocationOn className="similar-card-icon" />
          <p className="similar-card-icon-name ">{location}</p>
        </div>
        <div className="similar-card-icon-name-container">
          <BsBriefcase className="similar-card-icon" />
          <p className="similar-card-icon-name ">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
