"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TermsAndConditionsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="font-semibold underline cursor-pointer hover:text-[#FEBA17] transition-colors">
          Syarat & Ketentuan
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white rounded-3xl border-[#E5DEC5]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#4E1F00]">
            Syarat & Ketentuan Danus.in
          </DialogTitle>
          <DialogDescription className="text-[#7A6848]">
            Harap baca dengan seksama sebelum menggunakan layanan kami.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-6 text-sm text-[#4E1F00]/80 leading-relaxed">
            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                1. Ketentuan Umum
              </h3>
              <p>
                Danus.in adalah platform marketplace yang dirancang khusus
                untuk memfasilitasi kegiatan dana usaha (danus) di lingkungan
                mahasiswa. Dengan menggunakan platform ini, Anda setuju untuk
                mematuhi seluruh aturan yang berlaku.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                2. Persyaratan Pengguna
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Pengguna wajib merupakan mahasiswa aktif yang dibuktikan
                  dengan NIM valid.
                </li>
                <li>
                  Pengguna bertanggung jawab penuh atas kerahasiaan akun dan
                  password masing-masing.
                </li>
                <li>
                  Data yang dimasukkan saat registrasi harus akurat dan dapat
                  dipertanggungjawabkan.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                3. Ketentuan Penjual (Seller)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Seller wajib memastikan kualitas dan kebersihan produk yang
                  dijual.
                </li>
                <li>
                  Seller dilarang menjual produk ilegal, berbahaya, atau yang
                  melanggar kebijakan kampus.
                </li>
                <li>
                  Seller wajib mencantumkan informasi produk (harga, stok, lokasi
                  jemput) dengan jelas.
                </li>
                <li>
                  Seller bertanggung jawab atas ketersediaan produk sesuai jadwal
                  PO yang ditentukan.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                4. Ketentuan Pembeli (Buyer)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Pembeli wajib melakukan pengambilan pesanan sesuai lokasi dan
                  waktu yang telah disepakati.
                </li>
                <li>
                  Pembayaran dilakukan langsung kepada penjual sesuai metode yang
                  disepakati (Cash/QRIS/Transfer).
                </li>
                <li>
                  Pesanan yang sudah diproses tidak dapat dibatalkan secara
                  sepihak tanpa persetujuan penjual.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                5. Batasan Tanggung Jawab
              </h3>
              <p>
                Danus.in hanya bertindak sebagai perantara komunikasi. Kami
                tidak bertanggung jawab atas kerugian materiil atau non-materiil
                yang timbul dari transaksi antara penjual dan pembeli. Segala
                perselisihan harap diselesaikan secara kekeluargaan di lingkungan
                kampus.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-[#4E1F00] mb-2 text-base">
                6. Perubahan Ketentuan
              </h3>
              <p>
                Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu
                tanpa pemberitahuan terlebih dahulu. Penggunaan layanan secara
                berkelanjutan dianggap sebagai persetujuan atas perubahan
                tersebut.
              </p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
