import Image from "next/image";
import circleIcon from "@/assets/circle-1.svg";

export default function AyahNumber({ number }: { number: number }) {
  return (
    <div className="relative min-w-[36px] min-h-[36px]">
      <Image
        src={circleIcon}
        alt={number.toString()}
        width={36}
        height={36}
        quality={100}
      />
      <p className="absolute top-[19px] -translate-y-1/2 right-[18px] translate-x-1/2 text-primary dark:text-primary-foreground text-sm font-bold">
        {number}
      </p>
    </div>
  );
}
