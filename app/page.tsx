import dynamic from 'next/dynamic';
import Footer from './components/footer';
import Slide from './components/slide';
import Nhanvat from './components/nhanvat';
import Tinhnang from './components/tinhnang';
import Tintuc from './components/tintuc';

const Header = dynamic(() => import('./components/header'), { ssr: false });

export default function Home() {
  return (
    <main className="">
      {/* Hero section */}
      <Slide />
      {/* Features section */}
      <Tinhnang />
      <Tintuc />
      {/* Character section */}
      <Nhanvat />
      {/* Footer section */}
      <Footer />
    </main>
  );
}

