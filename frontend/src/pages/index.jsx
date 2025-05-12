import "@/styles"

import Header from "@/layouts/Header"
import Menu from "@/components/Menu"

export const metadata = {
  title: "Главная",
}

export default function () {
  return (
    <>
      <Header />
      <Menu />
    </>
  )
}
