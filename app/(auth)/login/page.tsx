import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const handleLogin = async () => {
    // TODO: panggil service login
  };

  return (
    <div className="flex min-h-[calc(100vh-56px-160px)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-[#4E1F00]">
            Danus.in
          </h1>
          <p className="mt-2 text-sm text-[#7A6848]">
            Selamat datang kembali! Yuk lanjut jajan.
          </p>
        </div>

        <Card className="rounded-3xl px-6 py-7">
          <CardHeader className="mb-6 space-y-2">
            <CardTitle>Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm onSubmit={handleLogin} />
            <p className="mt-4 text-center text-sm text-[#7A6848]">
              Belum punya akun?{" "}
              <Link
                href={ROUTES.REGISTER}
                className="font-medium text-[#4E1F00] hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
            <p className="mt-4 text-center text-[11px] text-[#A0906B]">
              Dengan masuk, Anda menyetujui{" "}
              <button
                type="button"
                className="font-semibold underline underline-offset-2"
              >
                Syarat &amp; Ketentuan
              </button>{" "}
              dan{" "}
              <button
                type="button"
                className="font-semibold underline underline-offset-2"
              >
                Kebijakan Privasi
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
