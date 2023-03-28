import '../../styles/Footer.css'
import githubIcon from '../../assets/github-logo.png'
import linkedinIcon from '../../assets/linkedin.png'

const Footer = () => {
  return (
    <div className='footer'>
      <a href='https://github.com/abhijeetnishal'>
        <img className='github-icon' src={githubIcon} alt='' />
      </a>
      <a href='https://www.linkedin.com/in/abhijeetkumar7565/'>
        <img className='linkedin-icon' src={linkedinIcon} alt='' />
      </a>
    </div>
  )
}

export default Footer