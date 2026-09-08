import Image from "next/image";
import { LiquidGradient } from "@/components/liquid-gradient";

export function HeroMockup() {
  return (
    <div className="hero-product">
      <LiquidGradient />
      <div className="hero-product__screen">
        <Image src="/assets/figma/hero-workspace.png" alt="Superspace workspace home dashboard" fill priority />
      </div>
    </div>
  );
}
