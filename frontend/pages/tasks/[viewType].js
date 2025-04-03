import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TaskView() {
  const router = useRouter();
  const { viewType } = router.query;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (viewType) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/view/${viewType}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
          setLoading(false);
        })
        .catch(() => router.push("/login"));
    }
  }, [viewType]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{viewType} Tasks</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border p-2 mb-2">
              <strong>{task.name}</strong> - Due: {new Date(task.dueDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}