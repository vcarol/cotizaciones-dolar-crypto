import Footer from '@/components/Footer';
import './globals.css'

export const metadata = {
  title: 'ArgenCoin | Cotizaciones en tiempo real',
  description: 'Sigue las cotizaciones en vivo de las criptomonedas más destacadas, como Bitcoin, Ethereum y las stablecoins, además del dólar.',
  keywords: 'criptomonedas, dólar, cotizaciones, finanzas, crypto, dolar blue, dolar oficial, dolar ccl, dolar mep, bitcoin, exchange, ethereum, usdc, usdt, tether, belo, lemon cash, ripio, buenbit',
  author: 'Carol Peves',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" >
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}