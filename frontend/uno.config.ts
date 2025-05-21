import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'btn': 'px-3 py-2 rounded cursor-pointer transition-colors',
      'btn-primary': 'btn bg-blue-500 text-white hover:bg-blue-600',
      'btn-danger': 'btn bg-red-500 text-white hover:bg-red-600',
      'btn-success': 'btn bg-green-500 text-white hover:bg-green-600',
      'input-text': 'px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
    }
  ],
  theme: {
    colors: {
      // ...
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})