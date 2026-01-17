import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paidego - Authenticate",
  description: "Paidego Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-dvh w-dvw flex justify-center items-center">
      {children}
    </main>
  );
}
