export default function Contact() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full border border-violet-300 p-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border border-violet-300 p-2 rounded" />
        <textarea placeholder="Message" className="w-full border border-violet-300 p-2 rounded h-32" />
        <button type="submit" className="bg-violet-500 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
