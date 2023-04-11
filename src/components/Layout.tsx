import { LayoutProps } from "@/types";
import Footer from "./Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
