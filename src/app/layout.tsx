import { SideBar } from "@/components/SideBar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listeng music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SideBar songs={userSongs}>{children}</SideBar>

            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
