// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import global
import Header from './componentes/Header';

export const metadata = {
  title: 'Proyecto Memory',
  description: 'Juego de memoria con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
