import { Inter } from "next/font/google";
import "./globals.css";
import data from '../Data/profile'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abhishek Savaliya",
  description: "Simply connect with Abhishek Savaliya",
  profiles: data.reduce((acc, item) => {
    acc[item.network] = {
      targetLink: item.targetLink,
      description: item.description
    };
    return acc;
  }, {})
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
