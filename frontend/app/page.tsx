import {
  Activity,
  Bot,
  Home,
  LayoutDashboard,
  Link2,
  Settings,
  Zap,
} from "lucide-react";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Visão geral do sistema",
  },
  {
    href: "/automations",
    label: "Automações",
    icon: Zap,
    description: "Regras e gatilhos",
  },
  {
    href: "/integrations",
    label: "Integrações",
    icon: Link2,
    description: "Dispositivos e serviços",
  },
  {
    href: "/sessions",
    label: "Sessões",
    icon: Bot,
    description: "Agentes inteligentes",
  },
];

const statusCards = [
  { label: "Dispositivos", value: "—", icon: Home, status: "idle" },
  { label: "Automações Ativas", value: "—", icon: Zap, status: "idle" },
  { label: "Eventos Hoje", value: "—", icon: Activity, status: "idle" },
  { label: "Integrações", value: "—", icon: Settings, status: "idle" },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Logo and Title */}
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-jarvis-cyan/30 bg-jarvis-navy/50 shadow-lg shadow-jarvis-cyan/10">
          <Bot className="h-10 w-10 text-jarvis-cyan" />
        </div>
        <h1 className="text-glow mb-2 text-4xl font-bold tracking-tight text-white">
          JARVIS Home
        </h1>
        <p className="max-w-md text-lg text-gray-400">
          Sistema de automação residencial inteligente com agentes LangGraph
        </p>
      </div>

      {/* Navigation Links */}
      <div className="mb-12 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              className="border-glow group flex flex-col items-center gap-2 rounded-xl border border-jarvis-blue/50 bg-jarvis-navy/30 p-4 transition-all hover:border-jarvis-cyan/50 hover:bg-jarvis-navy/60"
            >
              <Icon className="h-6 w-6 text-jarvis-cyan transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium text-white">
                {link.label}
              </span>
              <span className="text-center text-xs text-gray-500">
                {link.description}
              </span>
            </a>
          );
        })}
      </div>

      {/* Status Cards */}
      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
        {statusCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="flex flex-col items-center gap-1 rounded-lg border border-jarvis-navy bg-jarvis-dark/50 p-4"
            >
              <Icon className="mb-1 h-5 w-5 text-gray-500" />
              <span className="text-2xl font-bold text-white">
                {card.value}
              </span>
              <span className="text-xs text-gray-500">{card.label}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-gray-600">
        <p>JARVIS Home v0.1.0 — Powered by LangGraph & FastAPI</p>
      </footer>
    </main>
  );
}
