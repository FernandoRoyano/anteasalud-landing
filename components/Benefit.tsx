export default function Benefit() {
  return (
    <section className="w-full bg-blue-50 py-12 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full flex flex-col items-center gap-3">
        <span className="text-orange-500 font-black text-5xl md:text-6xl">+200</span>
        <p className="text-blue-900 font-bold text-xl md:text-2xl text-center">
          familias han recuperado su autonomía física<br />gracias a <span className="text-orange-500">ANTEA Salud</span>
        </p>
        <span className="block mt-2 text-gray-500 text-base md:text-lg">Servicios en toda España</span>
      </div>
    </section>
  );
}
