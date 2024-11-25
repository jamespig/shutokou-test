import Navigation from "./Navigation";

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-black">
      <Navigation />
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
};

export default Layout