'use client';

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Platform Introduction Images */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num}>
              <Image
                src={`/main/${num}.png`}
                alt={`플랫폼 소개 ${num}`}
                width={1200}
                height={800}
                className="w-full h-auto"
                priority={num <= 3}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
