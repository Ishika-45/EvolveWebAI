import { useParams } from "react-router-dom";

const ProjectPage = () => {
  const { id } = useParams();

  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const project = projects.find(p => p.id === Number(id));

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        {project.name}
      </h1>
      <p className="text-gray-400">
        Template: {project.template}
      </p>
    </div>
  );
};

export default ProjectPage;