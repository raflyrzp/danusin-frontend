"use client";

import { Github, Instagram, Linkedin, User } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const creators = [
  {
    name: "Rafly Rabbany Zalfa Pateda",
    role: "Full Stack Developer",
    image: "",
    socials: {
      github: "https://github.com/raflyrzp",
      linkedin: "https://linkedin.com/rafly-rabbany-zalfa-pateda",
      instagram: "https://instagram.com/raflyrzp",
    },
  },
  {
    name: "Muhammad Pradipta Arya Anindita",
    role: "Frontend Developer",
    image: "",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Alief Fadillah Nur Rachman",
    role: "Frontend Developer",
    image: "",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-[#4E1F00] py-6 text-center text-sm text-[#F8F4E1]/80">
      <div className="mx-auto flex items-center justify-center gap-1">
        <span>&copy; {currentYear} Danus.in. Created by</span>

        {/* Modal Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="font-medium text-[#FEBA17] underline decoration-dashed underline-offset-4 hover:text-white hover:decoration-solid transition-colors focus:outline-none"
            >
              us
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-[#F8F4E1] border-[#4E1F00]/10">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold text-[#4E1F00]">
                Meet the Team
              </DialogTitle>
              <DialogDescription className="text-center text-[#74512D]">
                Orang-orang dibalik layar Danus.in
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              {creators.map((creator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-[#4E1F00]/10 bg-white p-3 shadow-sm transition-all hover:shadow-md"
                >
                  <Avatar className="h-12 w-12 border border-[#FEBA17]">
                    <AvatarImage src={creator.image} alt={creator.name} />
                    <AvatarFallback className="bg-[#4E1F00] text-[#FEBA17]">
                      {creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4 className="font-semibold text-[#4E1F00]">
                      {creator.name}
                    </h4>
                    <p className="text-xs text-[#74512D]">{creator.role}</p>
                  </div>

                  <div className="flex gap-2">
                    <SocialIcon
                      href={creator.socials.github}
                      icon={<Github className="h-4 w-4" />}
                    />
                    <SocialIcon
                      href={creator.socials.linkedin}
                      icon={<Linkedin className="h-4 w-4" />}
                    />
                    <SocialIcon
                      href={creator.socials.instagram}
                      icon={<Instagram className="h-4 w-4" />}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <span>.</span>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8F4E1] text-[#4E1F00] transition-colors hover:bg-[#FEBA17] hover:text-[#4E1F00]"
    >
      {icon}
    </Link>
  );
}
