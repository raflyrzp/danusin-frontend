"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types";
import { userService, uploadService } from "@/services/user.service";
import { toast } from "sonner";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService. getMyProfile();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err. message : "Gagal memuat profil");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateProfile = async (
    data: Partial<Pick<User, "name" | "whatsapp">>
  ) => {
    try {
      const updatedUser = await userService.updateProfile(data);
      setUser(updatedUser);
      toast.success("Profil berhasil diperbarui");
      return updatedUser;
    } catch (err) {
      const message =
        err instanceof Error ? err.message :  "Gagal memperbarui profil";
      toast.error(message);
      throw err;
    }
  };

  const updateProfileImage = async (file: File) => {
    try {
      const imageUrl = await uploadService.uploadImage(file);
      const updatedUser = await userService.updateProfileImage(imageUrl);
      setUser(updatedUser);
      toast.success("Foto profil berhasil diperbarui");
      return updatedUser;
    } catch (err) {
      const message =
        err instanceof Error ? err.message :  "Gagal memperbarui foto profil";
      toast.error(message);
      throw err;
    }
  };

  const updateEmail = async (email: string, password:  string) => {
    try {
      await userService.updateEmail(email, password);
      await fetchUser();
      toast.success("Email berhasil diperbarui");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui email";
      toast.error(message);
      throw err;
    }
  };

  const updateWhatsapp = async (whatsapp: string) => {
    try {
      await userService.updateWhatsapp(whatsapp);
      await fetchUser();
      toast.success("Nomor WhatsApp berhasil diperbarui");
    } catch (err) {
      const message =
        err instanceof Error ? err.message :  "Gagal memperbarui WhatsApp";
      toast.error(message);
      throw err;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      await userService.changePassword(currentPassword, newPassword);
      toast.success("Password berhasil diperbarui");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal memperbarui password";
      toast.error(message);
      throw err;
    }
  };

  const upgradeToSeller = async (whatsapp: string, studentProofFile: File) => {
    try {
      const studentProofUrl = await uploadService.uploadImage(studentProofFile);
      await userService.upgradeToSeller({
        whatsapp,
        student_proof_url: studentProofUrl,
      });
      await fetchUser();
      toast.success("Berhasil upgrade ke seller!  Menunggu verifikasi.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal upgrade ke seller";
      toast. error(message);
      throw err;
    }
  };

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,
    updateProfile,
    updateProfileImage,
    updateEmail,
    updateWhatsapp,
    changePassword,
    upgradeToSeller,
    isSeller: user?. role === "seller",
  };
}
