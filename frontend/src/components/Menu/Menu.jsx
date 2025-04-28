import Button from "../Button"
import "./Menu.scss"

const Menu = () => {
  const menuSet = ["День рождения", "Новый год", "Юбилей", "Свадьба"]
  return (
    <main className="menu container">
      <div className="menu__inner">
        <ul className="menu__list">
          {menuSet.map((element, index) => (
            <Button
              href="/"
              classname="menu__item"
              label={element}
              id={index}
            />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Menu
