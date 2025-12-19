"use client";

import { useUser } from "@/hooks/use-user";
import { ChangePasswordForm } from "@/components/dashboard/buyer/ChangePasswordForm";
import { ShieldCheck, LockKeyhole } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ChangePasswordPage() {
  const { changePassword } = useUser();

  const handlePasswordChange = async (current: string, newPass: string) => {
    // The hook already handles the API call and toast notifications
    await changePassword(current, newPass);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#4E1F00]">Keamanan Akun</h1>
        <p className="text-sm text-[#74512D]">
          Kelola kata sandi dan keamanan akun Anda.
        </p>
      </div>

      <Separator className="bg-[#E3D9BD]" />

      {/* Main Card */}
      <Card className="border-[#E3D9BD] shadow-sm">
        <CardHeader className="bg-[#F8F4E1]/30 pb-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#FEBA17]/10 rounded-full">
              <ShieldCheck className="h-6 w-6 text-[#FEBA17]" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-lg text-[#4E1F00]">
                Ubah Password
              </CardTitle>
              <CardDescription className="text-[#74512D]">
                Pastikan akun Anda tetap aman dengan menggunakan password yang
                kuat.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            {/* Info Box */}
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 flex gap-3 items-start">
              <LockKeyhole className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-1 text-sm text-blue-800">
                <p className="font-semibold">Tips Keamanan</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700/80">
                  <li>Gunakan minimal 8 karakter.</li>
                  <li>
                    Kombinasikan huruf besar, huruf kecil, dan angka.
                  </li>
                  <li>Jangan gunakan password yang sama dengan situs lain.</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <ChangePasswordForm onSubmit={handlePasswordChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
