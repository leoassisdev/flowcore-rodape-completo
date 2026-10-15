// RodapeCompleto · Criado por FlowCore Soluções LTDA · flowcoresolucoes.com.br/codigos · licença MIT
// Rodapé institucional completo: marca e contato, 4 colunas de links, newsletter
// com validação, redes sociais (SVG inline) e linha legal com CNPJ.
// Props: tema ("claro" padrão | "escuro"), accent, marca, descricao, colunas, redes,
// razaoSocial, cnpj, endereco, contato, onNewsletter.
// Requisitos: React 18+ e Tailwind CSS 3+. Zero dependências. Sem chamadas de rede: use a prop onNewsletter.

import { useId, useState, type CSSProperties, type FormEvent } from "react";

type Coluna = { titulo: string; links: { rotulo: string; href: string }[] };
type Rede = "linkedin" | "instagram" | "youtube" | "whatsapp";

type Tema = "claro" | "escuro";

type Props = {
  /** Tema visual. Padrão "claro". */
  tema?: Tema;
  /** Cor de destaque (qualquer cor CSS). */
  accent?: string;
  marca?: string;
  descricao?: string;
  colunas?: Coluna[];
  redes?: { rede: Rede; href: string }[];
  razaoSocial?: string;
  cnpj?: string;
  endereco?: string;
  contato?: { email: string; telefone: string };
  onNewsletter?: (email: string) => void;
};

// Paleta do tema aplicada como CSS vars na raiz (não depende do tailwind.config).
const TEMAS: Record<Tema, Record<string, string>> = {
  claro: {
    "--fc-bg": "#F7F8FB", "--fc-surface": "#FFFFFF", "--fc-surface-2": "#F1F4F9",
    "--fc-border": "#E3E8F0", "--fc-border-strong": "#CBD3E1",
    "--fc-text": "#0B1220", "--fc-muted": "#4B5565", "--fc-subtle": "#8A94A6",
    "--fc-pos": "#059669", "--fc-neg": "#E11D48", "--fc-warn": "#D97706",
    "--fc-shadow": "0 1px 2px rgba(16,24,40,.06), 0 12px 32px -16px rgba(16,24,40,.18)",
    "--fc-link": "#4B5565", "--fc-faint": "#CBD3E1", "--fc-glow": "0.08",
  },
  escuro: {
    "--fc-bg": "#0B0F17", "--fc-surface": "rgba(255,255,255,0.03)", "--fc-surface-2": "rgba(255,255,255,0.06)",
    "--fc-border": "rgba(255,255,255,0.10)", "--fc-border-strong": "rgba(255,255,255,0.25)",
    "--fc-text": "#FFFFFF", "--fc-muted": "rgba(255,255,255,0.60)", "--fc-subtle": "rgba(255,255,255,0.40)",
    "--fc-pos": "#34D399", "--fc-neg": "#FB7185", "--fc-warn": "#FBBF24",
    "--fc-shadow": "0 24px 48px -24px rgba(0,0,0,.6)",
    "--fc-link": "rgba(255,255,255,0.65)", "--fc-faint": "rgba(255,255,255,0.20)", "--fc-glow": "0.10",
  },
};

// Cor de marca de cada rede (hover no claro).
const COR_REDE: Record<Rede, string> = { linkedin: "#0A66C2", instagram: "#E1306C", youtube: "#FF0000", whatsapp: "#25D366" };
const COR_COLUNA = ["var(--accent)", "#7C3AED", "#10B981", "#F59E0B", "#EC4899", "#06B6D4"];

const ICONES: Record<Rede, { nome: string; d: string }> = {
  linkedin: { nome: "LinkedIn", d: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z" },
  instagram: { nome: "Instagram", d: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 3c-2.4 0-2.7 0-3.7.06-3.3.15-5.1 1.95-5.24 5.24C3 9.3 3 9.6 3 12s0 2.7.06 3.7c.15 3.3 1.95 5.1 5.24 5.24C9.3 21 9.6 21 12 21s2.7 0 3.7-.06c3.3-.15 5.1-1.95 5.24-5.24C21 14.7 21 14.4 21 12s0-2.7-.06-3.7c-.15-3.3-1.95-5.1-5.24-5.24C14.7 3 14.4 3 12 3Zm0 1.6c2.35 0 2.63 0 3.56.05 2.3.1 3.4 1.2 3.5 3.5.05.93.05 1.2.05 3.56s0 2.63-.05 3.56c-.1 2.3-1.2 3.4-3.5 3.5-.93.05-1.2.05-3.56.05s-2.63 0-3.56-.05c-2.3-.1-3.4-1.2-3.5-3.5C4.6 14.63 4.6 14.35 4.6 12s0-2.63.05-3.56c.1-2.3 1.2-3.4 3.5-3.5.93-.05 1.2-.05 3.56-.05Z" },
  youtube: { nome: "YouTube", d: "M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" },
  whatsapp: { nome: "WhatsApp", d: "M12 2.2a9.8 9.8 0 0 0-8.4 14.85L2.2 21.8l4.86-1.37A9.8 9.8 0 1 0 12 2.2Zm0 17.9a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.88.81.82-2.8-.19-.3A8.1 8.1 0 1 1 12 20.1Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06a6.6 6.6 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.75 4.75 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.93.61.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z" },
};

const PADRAO: Coluna[] = [
  { titulo: "Produto", links: [{ rotulo: "Funcionalidades", href: "#funcionalidades" }, { rotulo: "Integrações", href: "#integracoes" }, { rotulo: "Preços", href: "#precos" }, { rotulo: "Novidades", href: "#novidades" }] },
  { titulo: "Soluções", links: [{ rotulo: "Financeiro", href: "#financeiro" }, { rotulo: "Comercial", href: "#comercial" }, { rotulo: "Indústria", href: "#industria" }, { rotulo: "Saúde", href: "#saude" }] },
  { titulo: "Empresa", links: [{ rotulo: "Sobre nós", href: "#sobre" }, { rotulo: "Clientes", href: "#clientes" }, { rotulo: "Carreiras", href: "#carreiras" }, { rotulo: "Contato", href: "#contato" }] },
  { titulo: "Suporte", links: [{ rotulo: "Central de ajuda", href: "#ajuda" }, { rotulo: "Status do sistema", href: "#status" }, { rotulo: "Segurança", href: "#seguranca" }, { rotulo: "Documentação da API", href: "#api" }] },
];

export default function RodapeCompleto({
  tema = "claro",
  accent = "#0057FF",
  marca = "Vértice",
  descricao = "Software de gestão que conecta financeiro, comercial e operação para empresas que querem crescer com processo.",
  colunas = PADRAO,
  redes = [
    { rede: "linkedin", href: "#linkedin" },
    { rede: "instagram", href: "#instagram" },
    { rede: "youtube", href: "#youtube" },
    { rede: "whatsapp", href: "#whatsapp" },
  ],
  razaoSocial = "Vértice Tecnologia LTDA",
  cnpj = "00.000.000/0001-00",
  endereco = "Av. Paulista, 1000 · São Paulo/SP · 01310-100",
  contato = { email: "contato@suaempresa.com.br", telefone: "(11) 4000-0000" },
  onNewsletter,
}: Props) {
  const id = useId();
  const escuro = tema === "escuro";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "erro" | "ok">("idle");

  const assinar = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setStatus("erro");
    onNewsletter?.(email.trim().toLowerCase());
    setStatus("ok");
    setEmail("");
  };

  const ano = new Date().getFullYear();

  return (
    <footer style={{ ...TEMAS[tema], "--accent": accent } as CSSProperties} className="relative isolate overflow-hidden border-t border-[var(--fc-border)] bg-[var(--fc-bg)] px-6 pt-16 text-[var(--fc-text)] lg:px-8">
      {!escuro && <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[var(--accent)] via-[#7C3AED] to-[#EC4899]" />}
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-80 w-[50rem] max-w-[200%] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[var(--fc-glow)] blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="#inicio" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white ${escuro ? "bg-[var(--accent)]" : "bg-gradient-to-br from-[var(--accent)] to-[#7C3AED] shadow-[0_6px_16px_-6px_var(--accent)]"}`}>{marca[0]}</span>
              {marca}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--fc-muted)]">{descricao}</p>

            <form onSubmit={assinar} noValidate className="mt-8 max-w-sm">
              <label htmlFor={`${id}-news`} className="text-sm font-medium">Receba conteúdo de gestão 1x por mês</label>
              <div className="mt-3 flex gap-2">
                <input
                  id={`${id}-news`}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="seu@empresa.com.br"
                  aria-invalid={status === "erro"}
                  aria-describedby={`${id}-news-status`}
                  className="h-11 min-w-0 flex-1 rounded-full border border-[var(--fc-border)] bg-[var(--fc-surface)] px-4 text-sm shadow-[var(--fc-shadow)] placeholder:text-[var(--fc-subtle)] transition-colors hover:border-[var(--fc-border-strong)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button type="submit" className="h-11 shrink-0 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                  Assinar
                </button>
              </div>
              <p id={`${id}-news-status`} aria-live="polite" className={`mt-2 min-h-[1rem] text-xs ${status === "erro" ? "text-[var(--fc-neg)]" : "text-[var(--fc-pos)]"}`}>
                {status === "erro" ? "Digite um e-mail válido." : status === "ok" ? "Inscrição confirmada. Até a próxima edição." : ""}
              </p>
            </form>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {colunas.map((c, ci) => (
              <div key={c.titulo}>
                <h2 className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[var(--fc-subtle)]">
                  {!escuro && <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: COR_COLUNA[ci % COR_COLUNA.length] }} />}
                  {c.titulo}
                </h2>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.rotulo}>
                      <a href={l.href} className="text-sm text-[var(--fc-link)] transition-colors hover:text-[var(--fc-text)] focus-visible:text-[var(--fc-text)] focus-visible:underline focus-visible:outline-none">
                        {l.rotulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-[var(--fc-border)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <address className="text-sm not-italic text-[var(--fc-muted)]">
            <a href={`mailto:${contato.email}`} className="hover:text-[var(--fc-text)]">{contato.email}</a>
            <span className="mx-2 text-[var(--fc-faint)]">·</span>
            <a href={`tel:${contato.telefone.replace(/\D/g, "")}`} className="tabular-nums hover:text-[var(--fc-text)]">{contato.telefone}</a>
          </address>
          <ul className="flex gap-2" aria-label="Redes sociais">
            {redes.map((r) => (
              <li key={r.rede}>
                <a href={r.href} aria-label={ICONES[r.rede].nome} style={escuro ? undefined : ({ "--rede": COR_REDE[r.rede] } as CSSProperties)} className={`flex h-10 w-10 items-center justify-center rounded-full border border-[var(--fc-border)] text-[var(--fc-muted)] transition ${escuro ? "hover:border-[var(--fc-border-strong)] hover:text-[var(--fc-text)]" : "bg-[var(--fc-surface)] shadow-[var(--fc-shadow)] hover:-translate-y-0.5 hover:border-[var(--rede)] hover:text-[var(--rede)]"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={ICONES[r.rede].d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--fc-border)] py-6 text-xs text-[var(--fc-subtle)] lg:flex-row lg:items-center lg:justify-between">
          <p className="tabular-nums">
            © {ano} {razaoSocial} · CNPJ {cnpj} · {endereco}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[["Termos de uso", "#termos"], ["Política de privacidade", "#privacidade"], ["Cookies", "#cookies"], ["Encarregado (DPO)", "#dpo"]].map(([l, h]) => (
              <li key={l}><a href={h} className="transition-colors hover:text-[var(--fc-text)]">{l}</a></li>
            ))}
          </ul>
        </div>

        <p className="pb-6 text-center text-[11px] text-[var(--fc-subtle)]">
          <a href="https://flowcoresolucoes.com.br/codigos" target="_blank" rel="noopener" className="transition-colors hover:text-[var(--fc-text)]">
            Criado por FlowCore Soluções LTDA
          </a>
        </p>
      </div>
    </footer>
  );
}
