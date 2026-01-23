import { AuditChat } from "@/modules/audit/interface-adapters/components/AuditChat";

export const metadata = {
  title: "Auditoria de Segurança | AuditAI",
  description: "Inicie uma nova auditoria de dependências com nossa inteligência artificial.",
};

export default function AuditPage() {
  return (
    <div className="h-full flex flex-col">
      <AuditChat />
    </div>
  );
}
