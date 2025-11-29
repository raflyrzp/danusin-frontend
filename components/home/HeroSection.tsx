"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FEBA17] px-4 py-16 md:py-24">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4E1F00_1px,transparent_1px)] bg-size-[16px_16px]"></div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#4E1F00] md:text-6xl">
          Cari Jajanan Danusan?
        </h1>
        <p className="mb-8 text-lg font-medium text-[#74512D] md:text-xl">
          Platform pre-order terpercaya untuk mahasiswa. Jajan enak sambil bantu
          teman!
        </p>

        <div className="mx-auto flex max-w-lg items-center gap-2 rounded-2xl bg-white p-2 shadow-lg ring-4 ring-[#4E1F00]/5">
          <div className="pl-3">
            <Search className="h-5 w-5 text-[#B4A98C]" />
          </div>
          <Input
            placeholder="Cari risol, nasi kulit, dll..."
            className="h-10 border-none bg-transparent px-2 text-base shadow-none focus-visible:ring-0 placeholder:text-[#B4A98C]"
          />
          <Button size="default" className="rounded-xl px-8 font-bold">
            Cari
          </Button>
        </div>
      </div>
    </section>
  );
}
