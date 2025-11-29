import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const handleRegister = async () => {
    // TODO: panggil service register
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-160px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#4E1F00]">
            Danus.in
          </h1>
          <p className="mt-2 text-sm text-[#7A6848]">
            Daftar dan mulai berjualan atau jajan di kampusmu!
          </p>
        </div>

        <Card className="rounded-3xl px-6 py-7">
          <CardHeader className="mb-6 space-y-2">
            <CardTitle>Buat Akun Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm onSubmit={handleRegister} />
            <p className="mt-3 text-center text-sm text-[#7A6848]">
              Sudah punya akun?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="font-medium text-[#4E1F00] hover:underline"
              >
                Masuk di sini
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
