import MobileApp from "@/components/mobile/MobileApp";
import ContactForm from "@/components/ContactForm";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  return (
    <div className="app-shell min-h-dvh">
      <MobileApp />
      <ContactForm />
      <AdminPanel />
    </div>
  );
}
