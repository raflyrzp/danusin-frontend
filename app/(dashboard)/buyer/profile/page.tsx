"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/dashboard/buyer/ProfileForm";
import { ProfileImageUpload } from "@/components/dashboard/buyer/ProfileImageUpload";
import { ChangeEmailDialog } from "@/components/dashboard/buyer/ChangeEmailDialog";
import { useUser } from "@/hooks/use-user";
import { ProfileFormData } from "@/schemas/user.schema";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const {
    user,
    isLoading:  isUserLoading,
    updateProfile,
    updateProfileImage,
    updateEmail,
  } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    await updateProfileImage(file);
  };

  const handleEmailChange = async (email: string, password: string) => {
    await updateEmail(email, password);
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#FEBA17]" />
      </div>
    );
  }

  if (! user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#74512D]">Gagal memuat profil</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <Card className="bg-white shadow-sm border-[#E3D9BD]">
        <CardHeader>
          <CardTitle className="text-[#4E1F00]">My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 space-y-4">
              <ProfileForm
                user={user}
                onSubmit={handleProfileSubmit}
                isLoading={isSubmitting}
              />

              {/* Email Section */}
              <ChangeEmailDialog
                currentEmail={user.email}
                onSubmit={handleEmailChange}
              />
            </div>

            {/* Profile Image Section */}
            <ProfileImageUpload
              currentImage={null} // Add user profile image when available
              name={user.name}
              onUpload={handleImageUpload}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
