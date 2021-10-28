import { ReactNode } from 'react';
import { Footer, Header } from '../../components';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`body-bg min-h-screen pt-12 pb-6 px-2 md:px-0 ${styles.bodybg}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
