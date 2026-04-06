export default function Skills() {
  return (
    <section className="max-w-4xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-6">Skills</h2>

      <div className="flex flex-wrap gap-4">
        {["React", "Next.js", "Tailwind", "Node.js"].map((skill) => (
          <span key={skill} className="px-4 py-2 rounded">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}