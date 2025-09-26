import { memo } from "react";
import { Header, Footer } from "./";

const Layout = memo(({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
});

Layout.displayName = "Layout";

export default Layout;
