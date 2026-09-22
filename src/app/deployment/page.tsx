import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeaderThemeScope } from "@/components/header-theme";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Deployment", description: "Explore Superspace deployment.", path: "/deployment" });
export default function DeploymentPage() { return <HeaderThemeScope className="site-v2"><Header/><main className="shell" style={{ minHeight: "60vh", paddingTop: "160px", paddingBottom: "120px" }}><h1>Deployment</h1></main><Footer/></HeaderThemeScope>; }
