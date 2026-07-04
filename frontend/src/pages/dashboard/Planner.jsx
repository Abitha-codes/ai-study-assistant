import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { plannerService } from "../../services/plannerService";
import { subjectService } from "../../services/subjectService";

const Planner = () => {
  const [plans, setPlans] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [studyDate, setStudyDate] = useState("");
  const [duration, setDuration] = useState(60);

  const completedPlans = plans.filter((p) => p.completed).length;

const pendingPlans = plans.length - completedPlans;

const progress =
  plans.length === 0
    ? 0
    : Math.round((completedPlans / plans.length) * 100);

  useEffect(() => {
    loadPlans();
    loadSubjects();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await plannerService.getPlans();
      setPlans(data.plans);
    } catch {
      toast.error("Failed to load plans");
    }
  };

  const loadSubjects = async () => {
    try {
      const data = await subjectService.getAll();
      setSubjects(data.subjects);
    } catch {}
  };

  const createPlan = async () => {
    if (!title || !subject || !studyDate) {
      return toast.error("Fill all required fields");
    }

    await plannerService.createPlan({
      title,
      description,
      subject,
      studyDate,
      duration,
    });

    toast.success("Study plan created");

    setTitle("");
    setDescription("");
    setStudyDate("");
    setDuration(60);

    loadPlans();
  };

  const togglePlan = async (id) => {
    await plannerService.togglePlan(id);
    loadPlans();
  };

  const deletePlan = async (id) => {
    await plannerService.deletePlan(id);
    toast.success("Deleted");
    loadPlans();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        📅 Study Planner
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <div className="card p-5">
    <h3 className="text-gray-500">Total Plans</h3>
    <p className="text-3xl font-bold mt-2">
      {plans.length}
    </p>
  </div>

  <div className="card p-5">
    <h3 className="text-gray-500">Completed</h3>
    <p className="text-3xl font-bold text-green-600 mt-2">
      {completedPlans}
    </p>
  </div>

  <div className="card p-5">
    <h3 className="text-gray-500">Progress</h3>

    <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

      <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
        style={{ width: `${progress}%` }}
      />

    </div>

    <p className="mt-2 font-semibold">
      {progress}% Completed
    </p>

  </div>

</div>

      <div className="card p-6 space-y-4">

        <input
          className="input-field"
          placeholder="Study Topic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="input-field"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="input-field"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option
            value=""
            className="bg-white text-black dark:bg-gray-800 dark:text-white"
            >
            Select Subject
          </option>

          {subjects.map((s) => (
            <option key={s._id} value={s._id} className="bg-white text-black dark:bg-gray-800 dark:text-white">
              {s.name}
            </option>
          ))}
        </select>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            className="input-field"
            value={studyDate}
            onChange={(e) => setStudyDate(e.target.value)}
          />

          <input
            type="number"
            className="input-field"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

        </div>

        <button
          className="btn-primary"
          onClick={createPlan}
        >
          Create Study Plan
        </button>

      </div>

      <div className="space-y-4">

        {plans.length === 0 ? (

  <div className="card p-10 text-center">

    <div className="text-6xl mb-4">
      📅
    </div>

    <h2 className="text-2xl font-bold">
      No Study Plans Yet
    </h2>

    <p className="text-gray-500 mt-2">
      Create your first study plan above.
    </p>

  </div>

) : (

  plans.map((plan) => (

          <div
            key={plan._id}
            className="card p-5 flex justify-between items-center"
          >

            <div>

              <h2
                className={`font-bold text-xl ${
                  plan.completed
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {plan.title}
              </h2>

              <div className="flex items-center gap-3 mt-2">

  <span className="font-medium">
    📚 {plan.subject?.name}
  </span>

  {plan.completed ? (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
      Completed
    </span>
  ) : (
    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
      Pending
    </span>
  )}

</div>

              <p className="text-sm mt-2">
                📅 {new Date(plan.studyDate).toLocaleDateString()}
              </p>

              <p className="text-sm">
                ⏱ {plan.duration} mins
              </p>

            </div>

            <div className="flex gap-3">

              <button
                className="btn-secondary"
                onClick={() => togglePlan(plan._id)}
              >
                {plan.completed ? "Undo" : "Done"}
              </button>

              <button
                className="btn-danger"
                onClick={() => deletePlan(plan._id)}
              >
                Delete
              </button>

            </div>

          </div>

          ))

)}
</div>

    </div>
  );
};

export default Planner;