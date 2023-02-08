import linkedin from '../assets/icons/linkedin.png';
import github from '../assets/icons/github.png';
import fb from '../assets/icons/facebook.png';
const Footer = () => {
  return(
    <footer>
      <nav className="flex flex-col justify-center items-center py-3 border-t-2" style={{color: '#75c7fb'}}>
        <div className="text-md lg:text-xl font-medium text-center">Made with ❤️</div>
        <ul className=" flex flex-row justify-center items-center">
          <li className="text-sm lg:text-xl mr-3 lg:mr-20"><a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/dewang-shekhar-7a69aa1a2/" title="star icons">
            <img src={linkedin} alt="linkedin" className="h-8"/>
          </a></li>
          <li className="text-sm lg:text-xl mr-3 lg:mr-20"><a rel="noreferrer" target="_blank" href="https://github.com/Robin920" title="goal icons">
            <img src={github} alt="github" className="h-8"/>
          </a></li>
          <li className="text-sm lg:text-xl mr-3 lg:mr-20"><a rel="noreferrer" target="_blank" href="https://www.facebook.com/devang.shekhar/" title="Kiranshastry">
            <img src={fb} alt="facebook" className="h-8"/>
          </a></li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer