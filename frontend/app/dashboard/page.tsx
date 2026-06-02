import { Activity, ArrowLeft, Home, Settings, Zap } from "lucide-react";

const stats = [
  { label: "Dispositivos Online", value: "—", icon: Home },
  { label: "Automações Ativas", value: "—", icon: Zap },
  { label: "Eventos Hoje", value: "—", icon: Activity },
  { label: "Integrações", value: "—", icon: Settings },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-jarvis-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </a>

        <h1 className="text-glow mb-2 text-3xl font-bold text-white">
          Dashboard
        </h1>
        <p className="mb-8 text-gray-400">Visão geral do sistema</p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-jarvis-navy bg-jarvis-dark/50 p-6"
              >
                <Icon className="h-6 w-6 text-jarvis-cyan" />
                <span className="text-2xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-center text-xs text-gray-500">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-jarvis-navy bg-jarvis-dark/30 p-8 text-center">
          <p className="text-gray-500">
            Dados em tempo real serão exibidos aqui nas próximas ondas.
          </p>
        </div>
      </div>
    </main>
  );
}
