import { LayoutProps } from "@/types";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
