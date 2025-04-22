import Button from "@/components/Button"
import "./Content.scss"

const Content = () => {
  const sectionsSet = ["Категории", "Поиск по ключевым словам", "Избранное"]
  return (
    <main className="content">
      <div className="content__inner">
        <ul className="content__list">
          {sectionsSet.map((element, index) => (
            <Button
              href="/"
              classname="content__item"
              label={element}
              id={index}
            />
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Content
