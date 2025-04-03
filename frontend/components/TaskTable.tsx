import { useState, useEffect } from "react";
import EditableTaskRow from "./EditableTaskRow";

// Tipul de date pentru un task
type Task = {
  id: number;
  name: string;
  dueDate: string;
  cat: string;
  speciality: string;
  city: string;
  tel: string;
  cnp: string;
  workplace: string;
  email: string;
  dob: string;
  cuim: string;
  address: string;
  schedule: string;
  vizita1: boolean;
  vizita2: boolean;
  userId: number;
};

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
  
      console.log("✅ Datele primite de la API:", data); // Debugging
  
      if (!Array.isArray(data)) {
        console.error("❌ Eroare: API-ul nu returnează un array de taskuri!");
        return;
      }
  
      setTasks(data);
    } catch (error) {
      console.error("❌ Eroare la preluarea taskurilor:", error);
    }
  };  

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista Taskurilor</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {[
              "ID",
              "Nume",
              "Due Date",
              "Categorie",
              "Specialitate",
              "Oraș",
              "Telefon",
              "CNP",
              "Loc de muncă",
              "Email",
              "Data Nașterii",
              "CUIM",
              "Adresă",
              "Program",
              "Vizita 1",
              "Vizita 2",
            ].map((header) => (
              <th key={header} className="border border-gray-300 px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => <EditableTaskRow key={task.id} task={task} onUpdate={fetchTasks} />)
          ) : (
            <tr>
              <td colSpan={16} className="text-center py-4">
                Nu există taskuri disponibile.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
