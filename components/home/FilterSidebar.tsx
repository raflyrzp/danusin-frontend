'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    days: string[];
    locations: string[];
  }) => void;
}

const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const LOCATIONS = ['Kampus A', 'Kampus B'];

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedDays, setSelectedDays] = useState<string[]>(DAYS);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(LOCATIONS);

  const handleDayToggle = (day: string) => {
    const newDays = selectedDays.includes(day)
      ?  selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newDays);
    onFilterChange({
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      days: newDays,
      locations: selectedLocations,
    });
  };

  const handleLocationToggle = (location: string) => {
    const newLocations = selectedLocations.includes(location)
      ?  selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(newLocations);
    onFilterChange({
      minPrice: priceRange.min,
      maxPrice: priceRange. max,
      days: selectedDays,
      locations: newLocations,
    });
  };

  const handlePriceChange = (value: number) => {
    const newMax = value;
    setPriceRange({ min: 0, max: newMax });
    onFilterChange({
      minPrice: 0,
      maxPrice: newMax,
      days: selectedDays,
      locations: selectedLocations,
    });
  };

  return (
    <aside className="w-full space-y-6 rounded-xl bg-white p-4 shadow-sm lg:w-56">
      {/* Price Range */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-[#4E1F00]">Harga</span>
          <span className="text-xs text-[#74512D]">
            Rp0-{priceRange.max. toLocaleString('id-ID')}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          step={5000}
          value={priceRange. max}
          onChange={(e) => handlePriceChange(Number(e.target. value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#F1E7C9] accent-[#FEBA17]"
        />
      </div>

      {/* Days Filter */}
      <div>
        <p className="mb-2 text-sm font-medium text-[#4E1F00]">Hari</p>
        <div className="space-y-1. 5">
          {DAYS.map((day) => (
            <label
              key={day}
              className="flex cursor-pointer items-center gap-2 text-sm text-[#4E1F00]"
            >
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="h-4 w-4 rounded border-[#E5DEC5] text-[#FEBA17] focus:ring-[#FEBA17]"
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <p className="mb-2 text-sm font-medium text-[#4E1F00]">Lokasi Pengambilan</p>
        <div className="space-y-1.5">
          {LOCATIONS.map((location) => (
            <label
              key={location}
              className="flex cursor-pointer items-center gap-2 text-sm text-[#4E1F00]"
            >
              <input
                type="checkbox"
                checked={selectedLocations. includes(location)}
                onChange={() => handleLocationToggle(location)}
                className="h-4 w-4 rounded border-[#E5DEC5] text-[#FEBA17] focus:ring-[#FEBA17]"
              />
              <span>{location}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
