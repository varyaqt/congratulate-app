import "@/styles"

import { Head } from "minista"
import Header from "@/layouts/Header"
import Content from "@/layouts/Content"
export default function (props) {
  const { children, title, url, isHeaderFixed } = props
  return (
    <>
      <Head htmlAttributes={{ lang: "ru" }}>
        <title>Поздравлю | {title}</title>
        <script src="/src/main.js" type="module"></script>
      </Head>
      <Header url={url} isFixed={isHeaderFixed} />
      <Content>{children}</Content>
    </>
  )
}
