import classNames from "classnames"
import "./Button.scss"

const Button = (props) => {
  const { classname, label } = props

  return (
    <a href="" className={classNames(classname, "button")}>
      <span className="button__inner">{label}</span>
    </a>
  )
}

export default Button
