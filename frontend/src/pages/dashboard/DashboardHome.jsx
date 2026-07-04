import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import {
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineRectangleStack,
  HiOutlineClipboardDocumentCheck,
  HiOutlineFire,
} from "react-icons/hi2";
import StatCard from "../../components/ui/StatCard";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { dashboardService } from "../../services/dashboardService";
import { plannerService } from "../../services/plannerService";
import toast from "react-hot-toast";

// Weekly activity / quiz score data will be populated once the study
// activity API (Phase 2: Subjects & Notes) is connected. Shown as an
// authentic empty state until then.
const weeklyActivity = [];
const quizScores = [];

const EmptyChartState = ({ message }) => (
  <div className="flex h-56 flex-col items-center justify-center text-center text-sm text-gray-400">
    <p>{message}</p>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
  totalSubjects: 0,
  totalNotes: 0,
  flashcards: 0,
  quizzes: 0,
  totalPlans: 0,
});

const [recentActivity, setRecentActivity] = useState([]);
const [upcomingPlans, setUpcomingPlans] = useState([]);
const [plans, setPlans] = useState([]);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await dashboardService.getDashboard();

    setStats(data.stats);
    setRecentActivity(data.recentActivity);
    setUpcomingPlans(data.upcomingPlans);

  } catch {
    toast.error("Failed to load dashboard");
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Here&apos;s an overview of your study activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
  icon={HiOutlineBookOpen}
  label="Total Subjects"
  value={stats.totalSubjects}
  color="primary"
/>

<StatCard
  icon={HiOutlineDocumentText}
  label="Uploaded Notes"
  value={stats.totalNotes}
  color="secondary"
/>

<StatCard
  icon={HiOutlineRectangleStack}
  label="Flashcards Generated"
  value={stats.flashcards}
  color="success"
/>

<StatCard
  icon={HiOutlineClipboardDocumentCheck}
  label="Quizzes Generated"
  value={stats.quizzes}
  color="warning"
/>
        <StatCard icon={HiOutlineFire} label="Study Streak" value={user?.studyStreak?.current || 0} suffix="days" color="danger" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

  <div className="card p-6">

    <h3 className="font-semibold mb-4">
      📅 Upcoming Study Plans
    </h3>

    {upcomingPlans.length === 0 ? (

      <p className="text-gray-500">
        No upcoming plans.
      </p>

    ) : (

      upcomingPlans.map((plan) => (

        <div
          key={plan._id}
          className="border-b py-3 last:border-0"
        >
          <h4 className="font-medium">
            {plan.title}
          </h4>

          <p className="text-sm text-gray-500">
            {new Date(plan.studyDate).toLocaleDateString()}
          </p>

        </div>

      ))

    )}

  </div>

  <div className="card p-6">

    <h3 className="font-semibold mb-4">
      🕒 Recent Activity
    </h3>

    {recentActivity.length === 0 ? (

      <p className="text-gray-500">
        No activity yet.
      </p>

    ) : (

      recentActivity.map((item) => (

        <div
          key={item._id}
          className="border-b py-3 last:border-0"
        >
          <h4 className="font-medium">
            {item.title}
          </h4>

          <p className="text-sm text-gray-500 capitalize">
            {item.action}
          </p>

        </div>

      ))

    )}

  </div>

</div>
    </div>
  );
};

export default DashboardHome;
