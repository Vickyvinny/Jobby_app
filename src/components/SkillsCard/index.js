import './index.css'

const SkillsCard = props => {
  const {eachSkill} = props
  const {name, imageUrl} = eachSkill
  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt={name} className="skills-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillsCard
