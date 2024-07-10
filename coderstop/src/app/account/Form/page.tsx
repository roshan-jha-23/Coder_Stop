"use client";
import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useTransition,
} from "react";
import axios from "axios";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Dropzone, { FileRejection } from "react-dropzone";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const ProfileCompletionForm = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [favoriteLanguage, setFavoriteLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/dashboard/?configuration=${configId}`);
      });
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `${file.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive",
    });
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  useEffect(() => {
    setError("");
  }, [email, bio, profilePictureUrl, skills, favoriteLanguage]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !bio || !profilePictureUrl || !skills || !favoriteLanguage) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/users/formdata", {
        email,
        bio,
        profilePicUrl: profilePictureUrl,
        skills,
        favoriteCodingLanguage: favoriteLanguage,
      });

      if (response.status === 200) {
        router.push("/account/login");
      } else {
        setError("Failed to update profile.");
      }
    } catch (error: any) {
      console.error("Profile update failed", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-purple-300">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <header className="text-center mb-4">
          <h1 className="font-bold text-xl text-neutral-800">
            Complete Your Profile
          </h1>
          <p className="text-neutral-600 text-sm">
            Fill in the details to complete your profile
          </p>
        </header>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="eg: user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Beast coder Bio:
          </label>
          <textarea
            id="bio"
            placeholder="eg: I am Hungry coder"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills:
          </label>
          <input
            id="skills"
            type="text"
            placeholder="eg: JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="favoriteLanguage"
            className="block text-sm font-medium text-gray-700"
          >
            Favorite Coding Language:
          </label>
          <input
            id="favoriteLanguage"
            type="text"
            placeholder="eg: Python, JavaScript"
            value={favoriteLanguage}
            onChange={(e) => setFavoriteLanguage(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilePictureUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture:
          </label>
          <div className="relative flex flex-1 flex-col items-center justify-center w-full">
            <Dropzone
              onDropRejected={onDropRejected}
              onDropAccepted={onDropAccepted}
              accept={{
                "image/png": [".png"],
                "image/jpeg": [".jpeg"],
                "image/jpg": [".jpg"],
              }}
              onDragEnter={() => setIsDragOver(true)}
              onDragLeave={() => setIsDragOver(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  className="h-full w-full flex-1 flex flex-col items-center justify-center"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragOver ? (
                    <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                  ) : isUploading || isPending ? (
                    <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                  ) : (
                    <Image className="h-6 w-6 text-zinc-500 mb-2" />
                  )}
                  <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <p>Uploading...</p>
                        <Progress
                          value={uploadProgress}
                          className="mt-2 w-40 h-2 bg-gray-300"
                        />
                      </div>
                    ) : isPending ? (
                      <div className="flex flex-col items-center">
                        <p>Redirecting, please wait...</p>
                      </div>
                    ) : isDragOver ? (
                      <p>
                        <span className="font-semibold">Drop file</span> to
                        upload
                      </p>
                    ) : (
                      <p>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    )}
                  </div>

                  {isPending ? null : (
                    <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? "Updating..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileCompletionForm;
