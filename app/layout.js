import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const dmSans = DM_Sans({ subsets: ['latin'], weight: ["300", "400", "500", "600"] });

export const metadata = {
  title: "QuickCart — Premium Electronics",
  description: "Next-generation e-commerce experience",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dmSans.className} antialiased`}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#161628',
                color: '#e8e8f8',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: "'Outfit', sans-serif",
              },
              success: { iconTheme: { primary: '#10b981', secondary: '#161628' } },
              error: { iconTheme: { primary: '#f43f5e', secondary: '#161628' } },
            }}
          />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}