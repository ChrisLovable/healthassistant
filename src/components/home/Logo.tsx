import Image from "next/image";

export function Logo() {
  return (
    <Image 
      src="/images/cipla.jpg" 
      alt="Cipla" 
      width={400} 
      height={80} 
      className="w-full h-auto max-h-12 object-contain"
      priority
    />
  );
}