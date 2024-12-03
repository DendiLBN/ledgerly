import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold">Ledgerly</h1>
      <p>
        <Button>
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
