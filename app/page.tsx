export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#050505] relative overflow-hidden">
      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tighest">
          TECHMIRE <span className="text-[#EF6524]">SOLUTIONS</span>
        </h1>
        <p className="text-gray-400 tracking-widest uppercase text-sm">
          Optical Core Online
        </p>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EF6524] rounded-full blur-[150px] opacity-20 pointer-events-none" />
    </main>
  );
}
