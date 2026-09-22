import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Careers", description: "Careers at Superspace.", path: "/careers" });
export default function CareersPage() { return <HeaderThemeScope className="site-v2"><Header/><main className="shell" style={{ minHeight: "60vh", paddingTop: "160px", paddingBottom: "120px" }}><h1>Careers</h1></main><Footer/></HeaderThemeScope>; }
