import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



function Header() {
    return (
        <div className="bg-white shadow-xl text-center p-4 rounded-b-2xl">
            <h1 className="text-2xl font-bold mb-4">Contact App | <a href="https://github.com/mohammad-dehdar/react-contact-app" target="_blank" className="text-lg bg-white px-1 py-2 rounded-sm transition-all hover:bg-black hover:text-white">Mohammad Dehdar <FontAwesomeIcon icon={faGithub} /></a></h1>
        </div>
    )
}

export default Header