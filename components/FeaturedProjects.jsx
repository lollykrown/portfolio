export default function FeaturedProject() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold mb-8">Featured Project</h2>

      <div className="p-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-2">
          Auth System
        </h3>

        <p className="mb-4">
          Built a secure authentication system using Next.js server actions and cookies.
        </p>

        <div className="mb-4 space-x-2">
          <span className="bg-accent/20 px-2 py-1 rounded">Next.js</span>
          <span className="bg-accent/20 px-2 py-1 rounded">Auth.js</span>
        </div>

        <div className="space-x-4">
          <a href="#" className="underline">Live</a>
          <a href="#" className="underline">GitHub</a>
        </div>
      </div>
    </section>
  );
}