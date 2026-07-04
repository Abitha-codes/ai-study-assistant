import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMoon, HiOutlineSun, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { settingsService } from "../../services/settingsService";
import { profileService } from "../../services/profileService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updatePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    return toast.error("Fill all fields");
  }

  if (newPassword !== confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {
    setUpdating(true);

    await settingsService.changePassword({
      currentPassword,
      newPassword,
    });

    toast.success("Password updated");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to update password"
    );
  } finally {
    setUpdating(false);
  }
};

    const deleteAccount = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to permanently delete your account?\n\nThis action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    await profileService.deleteAccount();

    toast.success("Account deleted successfully");

    logout();
  } catch (err) {
    toast.error(
      err?.response?.data?.message || "Failed to delete account"
    );
  }
};

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        ⚙️ Settings
      </h1>

      <div className="card p-6">

        <h2 className="text-xl font-semibold mb-5">
          Appearance
        </h2>

        <button
          className="btn-secondary"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <>
              <HiOutlineSun />
              Light Mode
            </>
          ) : (
            <>
              <HiOutlineMoon />
              Dark Mode
            </>
          )}
        </button>

      </div>

      <div className="card p-6 space-y-4">

        <h2 className="text-xl font-semibold">
          Change Password
        </h2>

        <div className="relative">
  <input
    type={showCurrent ? "text" : "password"}
    className="input-field pr-12"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
  />

  <button
    type="button"
    onClick={() => setShowCurrent(!showCurrent)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showCurrent ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
  </button>
</div>

        <div className="relative">
  <input
    type={showNew ? "text" : "password"}
    className="input-field pr-12"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
  />

  <button
    type="button"
    onClick={() => setShowNew(!showNew)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showNew ? (
      <HiOutlineEyeSlash size={20} />
    ) : (
      <HiOutlineEye size={20} />
    )}
  </button>
</div>

        <div className="relative">
  <input
    type={showConfirm ? "text" : "password"}
    className="input-field pr-12"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

  <button
    type="button"
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showConfirm ? (
      <HiOutlineEyeSlash size={20} />
    ) : (
      <HiOutlineEye size={20} />
    )}
  </button>
</div>

        <button
  className="btn-primary flex items-center justify-center gap-2"
  onClick={updatePassword}
  disabled={updating}
>
  {updating ? (
    <>
      <AiOutlineLoading3Quarters className="animate-spin" />
      Updating...
    </>
  ) : (
    "Update Password"
  )}
</button>

      </div>

      <div className="card border-red-200 p-6">

  <h2 className="text-xl font-semibold text-black dark:text-white mb-5">
    Account
  </h2>

  <div className="flex flex-col items-start gap-3">

    <button
      onClick={logout}
      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition font-medium"
    >
      Logout
    </button>

    <button
      onClick={deleteAccount}
      className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition font-medium"
    >
      Delete Account
    </button>

  </div>

</div>

    </div>
  );
};

export default Settings;