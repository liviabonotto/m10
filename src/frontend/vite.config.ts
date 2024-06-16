import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      return html
        .replace(`type="module" crossorigin src="/assets`, `type="module" src="./assets`)
        .replace(`crossorigin href="/assets`, `href="./assets`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), noAttr()],
})

//teste do bagulho das tasgs