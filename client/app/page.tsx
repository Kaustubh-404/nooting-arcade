import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Nooting Arcade</h1>
      
      <div className="flex flex-col gap-4">
        <Link 
          href="/fruit-slash"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
        >
          Play Fruit Slash
        </Link>
        
        <Link 
          href="/astro-jumper"
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center"
        >
          Play Astro Jumper
        </Link>
        
        <Link 
          href="/mini-arena-shooter"
          className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-center"
        >
          Play Mini Arena Shooter
        </Link>
        
        <Link 
          href="/pixel-racer"
          className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-center"
        >
          Play Pixel Racer
        </Link>
      </div>
    </div>
  );
}
