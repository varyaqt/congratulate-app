import "./Header.scss"
import "@/styles"
const Header = (props) => {
  const { description = "Слова для особенных моментов" } = props
  const title = "Поздравлю"
  return (
    <header className="header container">
      <h1 className="header__title">{title}</h1>
      <div className="header__description h2">
        <p>{description}</p>
      </div>
    </header>
  )
}

export default Header
