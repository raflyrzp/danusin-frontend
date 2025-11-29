import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function Footer() {
  return (
    <footer className="mt-12 w-full bg-danus-brown py-10 text-sm text-[#F8F4E1]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div className="text-3xl font-semibold tracking-tight">Danus.in</div>

        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <Link href="#" className="hover:underline">
            Tentang Kami
          </Link>
          <Link href="#" className="hover:underline">
            Kebijakan
          </Link>
          <Link href="#" className="hover:underline">
            Bantuan
          </Link>
          <Link href="#" className="hover:underline">
            Hubungi Kami
          </Link>
        </nav>
      </div>
    </footer>
  );
}
