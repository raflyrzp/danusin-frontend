import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px-160px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header Section - Sama seperti Login */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#4E1F00]">
            Danus.in
          </h1>
          <p className="mt-2 text-sm text-[#7A6848]">
            Bergabunglah bersama kami! Mulai jajan hari ini.
          </p>
        </div>

        {/* Card Section */}
        <Card className="rounded-3xl px-6 py-7 bg-white/80 backdrop-blur-sm border border-[#E5DEC5]/50 shadow-sm">
          <CardHeader className="mb-6 space-y-2 text-center">
            <CardTitle className="text-2xl text-[#4E1F00]">
              Daftar Akun
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Form Register */}
            <RegisterForm />

            {/* Link ke Login */}
            <p className="mt-6 text-center text-sm text-[#7A6848]">
              Sudah punya akun?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="font-bold text-[#FEBA17] hover:text-[#d99f14] hover:underline transition-colors"
              >
                Masuk di sini
              </Link>
            </p>

            {/* Catatan Footer (Opsional, karena di dalam form sudah ada checkbox agreement) */}
            <p className="mt-8 text-center text-[10px] text-[#A0906B] leading-tight">
              Pastikan data yang Anda masukkan sudah benar untuk kemudahan
              transaksi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
