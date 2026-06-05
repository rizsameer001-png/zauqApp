// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// //import { QueryClient, QueryClientProvider } from 'react-query'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { I18nextProvider } from 'react-i18next'
// import { Toaster } from 'react-hot-toast'

// import App from './App.jsx'
// import { store } from './store/index.js'
// import i18n from './i18n/index.js'
// import './index.css'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000,
//       cacheTime: 10 * 60 * 1000,
//       retry: 1,
//     },
//   },
// })

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <I18nextProvider i18n={i18n}>
//           <BrowserRouter>
//             <App />
//             <Toaster 
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//               }}
//             />
//           </BrowserRouter>
//         </I18nextProvider>
//       </QueryClientProvider>
//     </Provider>
//   </React.StrictMode>,
// )











import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import { store } from './store/index.js'
import i18n from './i18n/index.js'
import { AudioPlayerProvider } from './context/AudioPlayerContext.jsx'  // ✅ ADD THIS IMPORT
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <AudioPlayerProvider>  {/* ✅ ADD THIS WRAPPER */}
              <App />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </AudioPlayerProvider>  {/* ✅ CLOSE THE WRAPPER */}
          </BrowserRouter>
        </I18nextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)