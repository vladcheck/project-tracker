import "./AddTechnologyPage.css";
import AddTechnologyForm from "../../components/AddTechnologyForm/AddTechnologyForm";
import useTechnologies from "../../hooks/useTechnologies";

export default function AddTechnologyPage() {
  const { addTechnology } = useTechnologies();

  return (
    <main className="flex-center">
      <AddTechnologyForm onCancel={() => {}} onSave={addTechnology} />
    </main>
  );
}
