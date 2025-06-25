'use client';

export default function HomePage() {
  return(
<main className="min-h-screen p-4 bg-gray-900 text-white flex flex-col justify-center items-center gap-6">
<button
  onClick={() => (window.location.href = '/loldle')}
  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
>
  LOLDLE
</button>
<button
  onClick={() => (window.location.href = '/onepiecedle')}
  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
>
  ONEPIECEDLE
</button>
<button
  onClick={() => (window.location.href = '/narutodle')}
  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
>
  NARUTODLE
</button>
    </main>
  );
}
