import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
          <Link href="/think">Think Number</Link>
          <Link href="/doodle">Match Bobs</Link>
          <Link href="/bingo">Bingo</Link>
        </div>
    </main>
  );
}
