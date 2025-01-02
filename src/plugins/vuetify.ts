/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#121212', // Deep black for minimal eye strain
          surface: '#1E1E1E', // Slightly lighter surface for contrast against the background
          primary: '#f8b923', // Soft purple for a futuristic and stylish brand look
          secondary: '#03DAC6', // Cool teal for complementary accent
          error: '#CF6679', // Warm red for clear error visibility
          info: '#42A5F5', // Lighter blue for better contrast in dark mode
          success: '#66BB6A', // Softer green to harmonize with the dark theme
          warning: '#FFA726', // Muted orange for balanced visibility
        },
      },
    }
  },
})
