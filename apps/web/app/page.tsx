import { AppHome } from "@/components/appHome/appHome";
import { Header } from "@/components/layout/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <AppHome />
      </main>
    </>
  );
}
