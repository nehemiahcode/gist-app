import Provider from "@/components/Provider";
import "./globals.css";
import Nav from "@/components/Nav";
import CreateBtn from "@/components/create";

export const metadata = {
  title: "Gist App",
  description:
    "Create and share amazing prompts with the world, and let your imagination run wild",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Nav />
          <div className="main">
            <div className=" gradient" />
          </div>
          <main className="app">
            <CreateBtn />
            {children}
          
          </main>
        
        </Provider>
      </body>
    </html>
  );
}
