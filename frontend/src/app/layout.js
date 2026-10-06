import { Inter, Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Riyadvi Software Technologies | Custom Software & Digital Solutions",
    template: "%s | Riyadvi Software Technologies",
  },
  description: "Technology & Digital Solutions Partner. Web & App Development, UI/UX Design, Digital Marketing, AR/VR, 3D Modeling, and Business Strategy — all tailored to grow your business.",
  keywords: ["software development", "web development", "app development", "digital marketing", "UI/UX design", "AR VR", "3D modeling", "custom software", "digital transformation", "Riyadvi"],
  authors: [{ name: "Riyadvi Software Technologies" }],
  openGraph: {
    title: "Riyadvi Software Technologies",
    description: "Custom Software & Digital Solutions to Grow Your Business",
    url: "https://www.riyadvisoftwaretechnologies.com",
    siteName: "Riyadvi Software Technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyadvi Software Technologies",
    description: "Custom Software & Digital Solutions to Grow Your Business",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
