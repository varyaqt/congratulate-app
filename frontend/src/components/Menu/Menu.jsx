import Button from "../Button"
import "./Menu.scss"

const Menu = () => {
  const menuItems = [
    { label: "День рождения", href: "/birthday" },
    { label: "Новый год", href: "/christmas" },
    { label: "Юбилей", href: "/anniversary" },
    { label: "Свадьба", href: "/wedding" },
  ]
  return (
    <main className="menu container">
      <div className="menu__inner">
        <ul className="menu__list">
          {menuItems.map(({ label, href }, index) => (
            <li className="menu__item" key={index}>
              <Button href={href} label={label}></Button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Menu
