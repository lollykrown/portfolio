import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="max-w-4xl mx-auto py-20 px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Contact</h2>

      <p className="mb-6">Let&aposs build something great together.</p>

      <Link
        href="mailto:your@email.com"
        className="bg-accent px-6 py-2 rounded text-black"
      >
        Email Me
      </Link>
    </section>
  );
}