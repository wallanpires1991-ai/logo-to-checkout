import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Zap, ShoppingBasket, ListChecks, Infinity as InfinityIcon, Star, Gift, ShieldCheck,
  Lock, Check, ChevronDown, Flame, Clock, Drumstick, Cake, Beef, Salad, Croissant, Fish, Heart,
} from "lucide-react";
import logo from "@/assets/vovo-dita-logo.png.asset.json";
import camila from "@/assets/camila.jpg";
import juliana from "@/assets/juliana.jpg";
import beatriz from "@/assets/beatriz.jpg";

// 👉 Cole aqui o link do seu checkout de pagamento
const CHECKOUT_URL = "#";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caderninho de Receitas da Vovó Dita para Air Fryer" },
      { name: "description", content: "150 receitas caseiras irresistíveis para Air Fryer + 30 receitas fitness de brinde. Acesso imediato." },
      { property: "og:title", content: "Caderninho de Receitas da Vovó Dita para Air Fryer" },
      { property: "og:description", content: "150 receitas caseiras + 30 fitness de brinde. O sabor da vovó, com a praticidade da Air Fryer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CTA({ children = "QUERO GARANTIR MEU CADERNINHO AGORA", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <a
        href={CHECKOUT_URL}
        className="cta-pulse inline-flex w-full max-w-xl items-center justify-center rounded-2xl bg-success px-6 py-5 text-center text-lg font-black uppercase tracking-wide text-success-foreground transition hover:brightness-110 sm:text-xl"
      >
        {children}
      </a>
      <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-bold text-muted-foreground">
        <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Acesso Imediato</span>
        <span className="flex items-center gap-1"><Lock className="h-4 w-4 text-success" /> Compra 100% Segura</span>
      </p>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-primary">{kicker}</p>
      <h2 className="font-display text-3xl font-extrabold leading-tight text-secondary sm:text-4xl">{title}</h2>
    </div>
  );
}

const pillars = [
  { icon: Zap, t: "Praticidade Total", d: "Para o dia a dia corrido" },
  { icon: ShoppingBasket, t: "Ingredientes Fáceis", d: "O que você tem na geladeira" },
  { icon: ListChecks, t: "Passo a Passo Simples", d: "Para iniciantes e experientes" },
  { icon: InfinityIcon, t: "Acesso Vitalício", d: "Celular, tablet ou computador" },
];

const cats = [
  { icon: Croissant, t: "Petiscos & Salgados", d: "Pastelzinho, coxinha, bolinho de mandioca, batata crocante" },
  { icon: Drumstick, t: "Frangos Crocantes", d: "Sobrecoxa sequinha, frango à passarinho, empanados" },
  { icon: Beef, t: "Carnes Suculentas", d: "Picanha, costelinha, almôndegas, carne de panela" },
  { icon: Fish, t: "Peixes & Assados", d: "Tilápia, salmão, legumes assados, escondidinhos" },
  { icon: Cake, t: "Bolos & Doces", d: "Bolo de fubá, pudim, pão de queijo, churros" },
  { icon: Salad, t: "30 Receitas Fitness", d: "Bônus: refeições leves para comer sem culpa", bonus: true },
];

const testimonials = [
  { img: camila, n: "Camila R.", a: "34 anos · Mãe e esposa", q: "Minha família está apaixonada! A Air Fryer estava encostada aqui em casa e agora uso todo santo dia. As receitas de bolo de fubá e frango crocante são surreais de boas!" },
  { img: juliana, n: "Juliana T.", a: "28 anos · Trabalha fora", q: "O que mais me salvou foram as 30 receitas fitness. Consigo preparar meu almoço saudável em minutos quando chego do trabalho. Vale cada centavo!" },
  { img: beatriz, n: "Dona Beatriz", a: "52 anos", q: "Me lembrou muito a comida da minha infância, mas com a modernidade da Air Fryer. Super bem explicadinho, até quem não sabe cozinhar consegue." },
];

const faqs = [
  { q: "Como recebo o acesso?", a: "Logo após a confirmação do pagamento, você recebe no seu e-mail o link para baixar o Caderninho e o bônus. Com Pix e cartão, a liberação é imediata." },
  { q: "Funciona para qualquer modelo de Air Fryer?", a: "Sim! As receitas funcionam em qualquer marca e tamanho, com dicas de ajuste de tempo e temperatura para cada modelo." },
  { q: "Posso imprimir o caderninho?", a: "Pode sim! O material é em PDF, perfeito para ler no celular ou imprimir e deixar na cozinha, como um caderninho de verdade." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não amar, devolvemos 100% do seu dinheiro, sem perguntas." },
];

const buyers: [string, string][] = [
  ["Mariana S.", "São Paulo - SP"], ["Carla M.", "Rio de Janeiro - RJ"], ["Fernanda L.", "Belo Horizonte - MG"],
  ["Patrícia A.", "Salvador - BA"], ["Luciana P.", "Curitiba - PR"], ["Renata G.", "Recife - PE"],
  ["Adriana C.", "Fortaleza - CE"], ["Simone B.", "Porto Alegre - RS"], ["Vanessa O.", "Goiânia - GO"],
];

function SalesPopup() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const first = setTimeout(() => setShow(true), 3000);
    const iv = setInterval(() => {
      setShow(false);
      setTimeout(() => { setI((v) => (v + 1) % buyers.length); setShow(true); }, 500);
    }, 6000);
    return () => { clearTimeout(first); clearInterval(iv); };
  }, []);
  const [name, city] = buyers[i]!;
  const mins = (i % 6) + 1;
  return (
    <div className={`fixed bottom-24 left-3 z-40 max-w-[18rem] transition-all duration-500 sm:bottom-5 sm:left-5 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl">
        <img src={logo.url} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover object-top" />
        <div className="min-w-0 text-sm leading-tight">
          <p className="font-extrabold text-secondary">{name} de {city}</p>
          <p className="text-muted-foreground">comprou há {mins} minuto{mins > 1 ? "s" : ""}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-bold text-success"><Check className="h-3 w-3" /> Compra verificada</p>
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  const [left, setLeft] = useState(15 * 60);
  useEffect(() => {
    const iv = setInterval(() => setLeft((v) => (v <= 1 ? 15 * 60 : v - 1)), 1000);
    return () => clearInterval(iv);
  }, []);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return (
    <div className="flex items-center justify-center gap-3">
      <Clock className="h-5 w-5 text-accent" />
      <span className="text-sm font-bold uppercase tracking-wider">Oferta expira em</span>
      <div className="flex gap-1 font-display text-2xl font-black tabular-nums">
        <span className="rounded-lg bg-accent px-2 py-1 text-accent-foreground">{m}</span>:
        <span className="rounded-lg bg-accent px-2 py-1 text-accent-foreground">{s}</span>
      </div>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="paper min-h-screen overflow-x-hidden">
      {/* Badge */}
      <div className="bg-secondary px-4 py-2.5 text-center text-sm font-extrabold text-secondary-foreground sm:text-base">
        🔥 Fenômeno no Brasil: Mais de <span className="text-accent">10.000 unidades vendidas</span> nos últimos 5 dias!
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-black uppercase tracking-wider text-primary">
            O Segredo da Cozinha Prática e Saborosa
          </span>
          <h1 className="mt-5 font-display text-[2rem] font-black leading-[1.1] text-secondary sm:text-5xl">
            Transforme sua Air Fryer na sua <span className="text-primary">melhor aliada</span>: 150 Receitas Caseiras Irresistíveis{" "}
            <span className="relative inline">
              <span className="rounded bg-accent/70 px-1 [box-decoration-break:clone]">+ 30 Fitness de Brinde!</span>
              <span className="hidden" />
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Resgate o verdadeiro sabor da comida caseira da vovó, de forma super prática, rápida e sem sujeira na cozinha.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start">
            <div className="flex">{[camila, juliana, beatriz].map((s) => <img key={s} src={s} alt="" className="-ml-2 h-9 w-9 rounded-full border-2 border-card object-cover first:ml-0" />)}</div>
            <div className="text-left text-sm"><div className="flex text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div><span className="font-bold text-secondary">4,9/5 de +10 mil cozinheiras</span></div>
          </div>
          <CTA className="mt-8 lg:items-start" />
        </div>
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2">
          <div className="absolute inset-6 rounded-full bg-primary/25 blur-3xl" />
          <img src={logo.url} alt="Caderninho de Receitas da Vovó Dita para Air Fryer" className="float-soft relative w-full rounded-[2rem] shadow-2xl" />
          <div className="absolute right-1 top-6 rotate-6 rounded-2xl bg-accent px-4 py-2 text-center font-display font-black leading-tight text-accent-foreground shadow-lg">
            <span className="block text-xs uppercase">de R$97</span>por R$19,90
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="gingham py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 lg:grid-cols-4">
          {pillars.map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl bg-card p-5 text-center shadow-lg">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><I className="h-6 w-6" /></div>
              <h3 className="font-extrabold text-secondary">{t}</h3>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionTitle kicker="O que tem dentro" title="180 receitas que vão virar as queridinhas da sua casa" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map(({ icon: I, t, d, bonus }) => (
            <div key={t} className={`group relative rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl ${bonus ? "bg-accent text-accent-foreground" : "stitch bg-card"}`}>
              {bonus && <span className="absolute -top-3 right-5 rounded-full bg-primary px-3 py-1 text-xs font-black uppercase text-primary-foreground">Brinde</span>}
              <I className={`mb-3 h-9 w-9 ${bonus ? "" : "text-primary"}`} />
              <h3 className="font-display text-xl font-extrabold">{t}</h3>
              <p className={`mt-1 ${bonus ? "" : "text-muted-foreground"}`}>{d}</p>
            </div>
          ))}
        </div>
        <CTA className="mt-12" />
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle kicker="Quem já tem, ama" title="Olha o que nossas clientes estão dizendo" />
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.n} className="flex flex-col rounded-3xl bg-card p-6 shadow-md">
                <div className="mb-3 flex text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-current" />)}</div>
                <blockquote className="flex-1 text-foreground">“{t.q}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <img src={t.img} alt={t.n} loading="lazy" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                  <div><p className="font-extrabold text-secondary">{t.n}</p><p className="text-sm text-muted-foreground">{t.a}</p></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bonus */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="relative overflow-hidden rounded-[2rem] border-4 border-dashed border-accent bg-card p-8 text-center sm:p-12">
          <Gift className="mx-auto mb-4 h-14 w-14 text-primary" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">Super bônus exclusivo</p>
          <h2 className="mt-2 font-display text-3xl font-black text-secondary sm:text-4xl">+ 30 Receitas Fitness para Air Fryer</h2>
          <p className="mt-3 text-muted-foreground">Refeições leves, gostosas e rápidas para comer sem culpa — sem abrir mão do sabor.</p>
          <p className="mt-6 font-display text-2xl font-black">
            <span className="text-muted-foreground line-through decoration-primary decoration-2">De R$ 97,00</span>{" "}
            <span className="text-success">por R$ 0,00</span>
          </p>
        </div>
      </section>

      {/* Offer */}
      <section id="oferta" className="gingham scroll-mt-4 px-5 py-20">
        <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] bg-card shadow-2xl">
          <div className="bg-secondary px-6 py-4 text-secondary-foreground"><Countdown /></div>
          <div className="p-7 text-center sm:p-9">
            <img src={logo.url} alt="" loading="lazy" className="mx-auto -mt-2 w-44 rounded-2xl shadow-lg" />
            <ul className="mx-auto mt-6 space-y-3 text-left">
              {["E-book com 150 Receitas Caseiras da Vovó", "Bônus: 30 Receitas Fitness para Air Fryer", "Acesso Vitalício + Atualizações", "Leia no celular ou imprima em casa", "Garantia incondicional de 7 dias"].map((x) => (
                <li key={x} className="flex items-start gap-3 font-semibold"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success text-success-foreground"><Check className="h-4 w-4" /></span>{x}</li>
              ))}
            </ul>
            <div className="my-7 border-t-2 border-dashed border-border pt-6">
              <p className="text-muted-foreground">De <span className="line-through">R$ 97,00</span> por apenas</p>
              <p className="font-display text-6xl font-black text-primary"><span className="align-top text-2xl">R$</span>19,90</p>
              <p className="text-sm font-bold text-muted-foreground">pagamento único · menos que uma pizza 🍕</p>
            </div>
            <CTA>QUERO MEU CADERNINHO AGORA</CTA>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground"><ShieldCheck className="h-4 w-4 text-success" /> Pix · Cartão · Ambiente criptografado</div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 py-20 text-center md:flex-row md:text-left">
        <div className="grid h-40 w-40 shrink-0 place-items-center rounded-full border-8 border-double border-accent bg-primary text-primary-foreground shadow-xl">
          <div className="text-center leading-none"><ShieldCheck className="mx-auto h-8 w-8" /><p className="font-display text-5xl font-black">7</p><p className="text-xs font-black uppercase tracking-widest">dias de garantia</p></div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-black text-secondary">Risco Zero!</h2>
          <p className="mt-3 text-lg text-muted-foreground">Se você não se apaixonar pelas receitas e não simplificar sua vida na cozinha em até 7 dias, devolvemos 100% do seu dinheiro sem nenhuma burocracia.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <SectionTitle kicker="Dúvidas" title="Perguntas frequentes" />
        <div className="space-y-3">
          {faqs.map((f, k) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => setOpen(open === k ? null : k)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-extrabold text-secondary">
                {f.q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === k ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === k ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden"><p className="px-5 pb-5 text-muted-foreground">{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
        <CTA className="mt-12" />
      </section>

      {/* Footer */}
      <footer className="bg-secondary px-5 pb-28 pt-12 text-center text-secondary-foreground sm:pb-12">
        <img src={logo.url} alt="Vovó Dita" loading="lazy" className="mx-auto w-28 rounded-2xl" />
        <p className="mt-4 flex items-center justify-center gap-1 font-bold">Feito com <Heart className="h-4 w-4 fill-primary text-primary" /> pela Vovó Dita</p>
        <div className="mt-4 flex justify-center gap-4 text-xs font-bold opacity-80">
          <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Site seguro</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Garantia 7 dias</span>
          <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> Acesso imediato</span>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-xs opacity-60">
          Termos de Uso · Política de Privacidade. Este produto é digital (e-book em PDF). Os resultados podem variar de pessoa para pessoa. © {new Date().getFullYear()} Caderninho de Receitas da Vovó Dita. Todos os direitos reservados.
        </p>
      </footer>

      <SalesPopup />

      <a href="#oferta" className="fixed bottom-4 right-4 z-50 rounded-full bg-primary px-5 py-3.5 text-sm font-black uppercase text-primary-foreground shadow-2xl sm:hidden">
        Quero Minhas Receitas
      </a>
    </div>
  );
}
