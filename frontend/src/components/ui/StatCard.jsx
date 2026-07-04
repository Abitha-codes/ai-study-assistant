const colorMap = {
  primary: "from-primary-500 to-primary-600",
  secondary: "from-secondary-500 to-secondary-600",
  success: "from-green-500 to-green-600",
  warning: "from-orange-500 to-orange-600",
  danger: "from-red-500 to-red-600",
};

const StatCard = ({ icon: Icon, label, value, suffix, color = "primary" }) => {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorMap[color]} text-white`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold">
          {value}
          {suffix && <span className="ml-1 text-sm font-medium text-gray-400">{suffix}</span>}
        </p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
