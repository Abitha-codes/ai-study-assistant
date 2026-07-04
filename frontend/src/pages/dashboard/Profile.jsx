import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { profileService } from "../../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setUser(data.user);
      setFullName(data.user.fullName);
      setAvatar(data.user.avatar || "");
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
  try {
    setSaving(true);

    const data = await profileService.updateProfile({
      fullName,
      avatar,
    });

    setUser(data.user);
    setAvatar(data.user.avatar);

    toast.success("Profile updated successfully");
  } catch {
    toast.error("Update failed");
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="card p-8 text-center">
        <div className="flex justify-center">

  {avatar ? (

    <img
      src={avatar}
      alt="Profile"
      className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
    />

  ) : (

    <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
      {user.fullName.charAt(0).toUpperCase()}
    </div>

  )}

</div>

        <h1 className="text-3xl font-bold mt-5">
          {user.fullName}
        </h1>

        <p className="text-gray-500 mt-2">
          {user.email}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

      <div className="card p-6">

  {!editing ? (

    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-500">
          Name
        </p>

        <h2 className="text-xl font-semibold">
          {user.fullName}
        </h2>
      </div>

      <button
        className="btn-primary"
        onClick={() => setEditing(true)}
      >
        Edit Profile
      </button>

    </div>

  ) : (

    <div className="space-y-4">

      <div className="space-y-2">
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
    Change Name
  </label>

  <input
    className="input-field"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />

  <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-4 block">
    Profile Picture
  </label>

  <input
    type="file"
    accept="image/*"
    className="input-field"
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatar(reader.result);
      };

      reader.readAsDataURL(file);
    }}
  />
</div>

      <div className="flex gap-3 flex-wrap">

  <button
  className="btn-primary flex items-center justify-center gap-2"
  disabled={saving}
  onClick={async () => {
    await saveProfile();
    setEditing(false);
  }}
>
  {saving ? (
    <>
      <AiOutlineLoading3Quarters className="animate-spin" />
      Saving...
    </>
  ) : (
    "Save"
  )}
</button>

  <button
    className="btn-secondary"
    onClick={() => {
      setFullName(user.fullName);
      setAvatar(user.avatar || "");
      setEditing(false);
    }}
  >
    Cancel
  </button>

  {avatar && (
    <button
      className="rounded-xl bg-red-500 px-5 py-2.5 font-medium text-white hover:bg-red-600"
      onClick={() => setAvatar("")}
    >
      Remove Photo
    </button>
  )}

</div>

    </div>

  )}

</div>

    </div>
  );
};

export default Profile;