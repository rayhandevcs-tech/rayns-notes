import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import BackToTop from "./components/BackToTop";
import PageTransition from "./components/PageTransition";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Rayn's Notes",
  description: "My personal thoughts, feelings and journal.",
  icons: {
    icon: "/profile_pic.png",
    apple: "/profile_pic.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${geist.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}