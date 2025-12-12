'use client';

import { useState } from 'react';
import { Search, Store } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchSection({ onSearch, initialQuery = '' }: SearchSectionProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e. preventDefault();
    onSearch(query);
  };

  return (
    <section className="border-b border-[#F3E8C0] bg-[#F8F4E1] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-sm md:flex-row">
          {/* Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F1E7C9] text-[#74512D]">
            <Store className="h-8 w-8" />
          </div>

          {/* Search Form */}
          <div className="flex-1 w-full">
            <h2 className="mb-3 text-xl font-bold text-[#4E1F00]">
              Cari makanan danusan!
            </h2>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B4A98C]" />
                <Input
                  type="text"
                  placeholder="cari aja di sini"
                  value={query}
                  onChange={(e) => setQuery(e. target.value)}
                  className="h-10 pl-10 border-[#E5DEC5] bg-[#FAFAFA] placeholder:text-[#B4A98C]"
                />
              </div>
              <Button type="submit" className="px-6">
                Cari
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
