import classNames from "classnames"
import "./Button.scss"

const Button = (props) => {
  const { classname, label, href } = props

  return (
    <a href={href} className={classNames(classname, "button")}>
      <span className="button__inner">{label}</span>
    </a>
  )
}

export default Button
