import { Status, Tech } from "../types";

export function sortById(technologies: Tech[]) {
  return technologies.sort((t1, t2) => (t1.id < t2.id ? -1 : 1));
}

export const getTechnologiesByValue = <T>(
  technologies: Tech[],
  key: keyof Tech,
  value: T,
) => technologies.filter((t) => t[key] === value);

export const getTechnologiesByStatus = (technologies: Tech[], status: Status) =>
  technologies.filter((t) => t.status === status);

export const exportTechnologies = (technologies: Tech[]) => {
  try {
    const dataStr = JSON.stringify(technologies, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `technologies_${new Date().toISOString().split("T")[0]}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

// импорт данных из JSON-файла
export const importTechnologiesFromJSON = (event: any, setTechnologies: (t: Tech[]) => void) => { 
  const file = event.target.files[0]; 
  if (!file) return; 
 
  const reader = new FileReader(); 
   
  reader.onload = (e) => { 
    try { 
      if (!e.target || !e.target.result) throw new Error("Нет данных");
      const imported = JSON.parse(e.target.result.toString()); 
       
      if (!Array.isArray(imported)) { 
        throw new Error('Неверный формат данных'); 
      }
      setTechnologies(imported); 
      console.log(`Импортировано ${imported.length} технологий`); 
    } catch (err) { 
      console.error(`Ошибка импорта: ${err}`); 
    } 
  }; 
   
  reader.readAsText(file); 
  event.target.value = '';  // очищаем input после чтения файла
};
