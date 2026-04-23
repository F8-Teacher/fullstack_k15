import Script from "next/script";
import "./globals.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
});
export const metadata = {
  title: "F8 - Học lập trình không khó",
  description: "Học lập trình để đi làm tại F8",
  openGraph: {
    title: "F8 - FB",
    description: "Học lập trình để đi làm tại F8 - FB",
    images: ["https://f8.edu.vn/image01.jpg"],
  },
  icons: {
    icon: "https://files.fullstack.edu.vn/f8-prod/organization-logos/694743c405102.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <Script src="/livechat.js" />
      </body>
    </html>
  );
}

//root layout -> custom layout -> page
