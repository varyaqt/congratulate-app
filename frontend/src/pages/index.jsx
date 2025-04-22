import "@/styles"

import Header from "@/layouts/Header"
import Content from "@/layouts/Content"

export const metadata = {
  title: "Главная",
}

export default function () {
  return (
    <>
      <Header />
      <Content></Content>
    </>
  )
}
