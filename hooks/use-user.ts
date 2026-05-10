"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, uploadService } from "@/services/user.service";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export function useUser() {
  const qc = useQueryClient();
  const { data: user, isLoading, error, refetch } = useQuery({ queryKey: ["user", "me"], queryFn: () => userService.getMyProfile() });

  const updateProfile = useMutation({
    mutationFn: (d: any) => userService.updateProfile(d),
    onSuccess: (res) => {
      qc.setQueryData(["user", "me"], (prev: any) => ({ ...prev, ...res }));
      toast.success("Profil diperbarui");
    },
    onError: (err: any) => toast.error(err.message || "Gagal update profil"),
  });

  const updateEmail = useMutation({
    mutationFn: ({ e, p }: any) => userService.updateEmail(e, p),
    onSuccess: () => toast.success("Email diperbarui"),
    onError: (err: any) => toast.error(err.message || "Gagal update email"),
  });

  const updateWhatsapp = useMutation({
    mutationFn: (w: string) => userService.updateWhatsapp(w),
    onSuccess: () => toast.success("WhatsApp diperbarui"),
    onError: (err: any) => toast.error(err.message || "Gagal update WhatsApp"),
  });

  const changePassword = useMutation({
    mutationFn: ({ c, n }: any) => userService.changePassword(c, n),
    onSuccess: () => toast.success("Password diperbarui"),
    onError: (err: any) => toast.error(err.message || "Gagal update password"),
  });

  const upgradeToSeller = useMutation({
    mutationFn: (d: any) => userService.upgradeToSeller(d),
    onSuccess: (res: any) => {
      if (res.data?.token) apiClient.setToken(res.data.token);
      qc.invalidateQueries({ queryKey: ["user", "me"] });
      qc.invalidateQueries({ queryKey: ["store"] });
      toast.success("Berhasil upgrade ke seller");
    },
    onError: (err: any) => toast.error(err.message || "Gagal upgrade"),
  });

  const updateProfileImage = useMutation({
    mutationFn: async (f: File) => {
      const url = await uploadService.uploadImage(f);
      return userService.updateProfileImage(url);
    },
    onSuccess: (u) => {
      qc.setQueryData(["user", "me"], u);
      toast.success("Foto profil diperbarui");
    },
    onError: (err: any) => toast.error(err.message || "Gagal update foto"),
  });

  return {
    user: user || null,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
    updateProfile: updateProfile.mutateAsync,
    updateProfileImage: updateProfileImage.mutateAsync,
    updateEmail: (e: string, p: string) => updateEmail.mutateAsync({ e, p }),
    updateWhatsapp: (w: string) => updateWhatsapp.mutateAsync(w),
    changePassword: (c: string, n: string) => changePassword.mutateAsync({ c, n }),
    upgradeToSeller: (store: string, desc: string, wa: string) => upgradeToSeller.mutateAsync({ store_name: store, description: desc, whatsapp: wa }),
    isSeller: user?.role === "seller",
  };
}
