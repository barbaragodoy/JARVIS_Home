import { ArrowLeft, Plus, Zap } from "lucide-react";

export default function AutomationsPage() {
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

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-glow text-3xl font-bold text-white">
              Automações
            </h1>
            <p className="mt-2 text-gray-400">Regras e gatilhos</p>
          </div>
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-lg border border-jarvis-cyan/30 bg-jarvis-navy/50 px-4 py-2 text-sm text-jarvis-cyan opacity-50"
          >
            <Plus className="h-4 w-4" />
            Nova Automação
          </button>
        </div>

        <div className="rounded-xl border border-jarvis-navy bg-jarvis-dark/30 p-12 text-center">
          <Zap className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-lg text-gray-400">
            Nenhuma automação configurada
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Crie regras de automação nas próximas ondas.
          </p>
        </div>
      </div>
    </main>
  );
}
