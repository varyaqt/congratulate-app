import "@/styles"

import { Head } from "minista"
import Header from "@/layouts/Header"
import Content from "@/layouts/Content"

export default function () {
  return (
    <>
      <Head htmlAttributes={{ lang: "ru" }}>
        <title>Поздравлю | Главная страница</title>
        <script src="/src/main.js" type="module"></script>
      </Head>
      <Header />
      <Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, ullam
        aliquam? Earum voluptate, quis architecto, obcaecati voluptas sit quia,
        possimus nisi dicta aliquam nihil velit! Alias tempore vero voluptate
        vel.
      </Content>
    </>
  )
}
