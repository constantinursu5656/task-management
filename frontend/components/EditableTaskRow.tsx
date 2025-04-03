import { useState } from "react";

// Definim tipul Task
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

// Tipizăm props-urile componentei
interface EditableTaskRowProps {
  task: Task;
  onUpdate: () => void;
}

export default function EditableTaskRow({ task, onUpdate }: EditableTaskRowProps) {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isEditing, setIsEditing] = useState<null | keyof Task>(null);

  const handleChange = (field: keyof Task, value: any) => {
    console.log(`Modificare în: ${field}, valoare nouă:`, value); // Debugging
    setEditedTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const saveChange = async (field: keyof Task) => {
    if (task[field] !== editedTask[field]) {
      try {
        const response = await fetch(`/api/tasks/${task.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [field]: editedTask[field] }),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        onUpdate();
      } catch (error) {
        console.error("Eroare la actualizare:", error);
      }
    }
    setIsEditing(null);
  };

  return (
    <tr>
      <td className="border px-4 py-2">{task.id}</td>
      <td className="border px-4 py-2">
        {isEditing === "name" ? (
          <input
            value={editedTask.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => saveChange("name")}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing("name")}>{task.name || "-"}</span>
        )}
      </td>

      <td className="border px-4 py-2">
        <input
          type="date"
          value={editedTask.dueDate ? editedTask.dueDate.split("T")[0] : ""}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          onBlur={() => saveChange("dueDate")}
        />
      </td>

      <td className="border px-4 py-2">
        <select value={editedTask.cat} onChange={(e) => handleChange("cat", e.target.value)} onBlur={() => saveChange("cat")}>
          <option value="-">-</option>
          <option value="A">A</option>
          <option value="A+">A+</option>
        </select>
      </td>

      <td className="border px-4 py-2">
        <select value={editedTask.speciality} onChange={(e) => handleChange("speciality", e.target.value)} onBlur={() => saveChange("speciality")}>
          {[
            "Balneo-Fizio",
            "Cardiologie",
            "Chirurgie",
            "Dermatologie",
            "Diabetologie",
            "Endocrinologie",
            "Gastroenterologie",
            "Geriatrie",
            "Ginecologie",
            "Gp",
            "Hematologie",
            "Imunologie",
            "Infectioasse",
            "Interne",
            "Nefrologie",
            "Neurochirurgie",
            "Neurologie",
            "Obstretica Ginecologie",
            "Oftalmologie",
            "Oncologie",
            "ORL",
            "Ortopedie",
            "Psihiatrie",
            "Reumatologie",
            "Urologie",
            "Urgente",
            "Recuperare",
            "Medicina Sportiva",
            "Neonantologie",
            "MF",
            "Pediatrie",
            "Pneumologie",
            "Alergologie",
          ].map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
      </td>

      <td className="border px-4 py-2">
        <input type="checkbox" checked={editedTask.vizita1} onChange={(e) => handleChange("vizita1", e.target.checked)} onBlur={() => saveChange("vizita1")} />
      </td>

      <td className="border px-4 py-2">
        <input type="checkbox" checked={editedTask.vizita2} disabled={editedTask.cat === "A"} onChange={(e) => handleChange("vizita2", e.target.checked)} onBlur={() => saveChange("vizita2")} />
      </td>
    </tr>
  );
}
