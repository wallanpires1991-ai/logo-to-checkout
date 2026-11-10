import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Zap, ShoppingBasket, ListChecks, Infinity as InfinityIcon, Star, Gift, ShieldCheck,
  Lock, Check, ChevronDown, Flame, Clock, Drumstick, Cake, Beef, Salad, Croissant, Fish, Heart,
} from "lucide-react";
import logoSrc from "@/assets/vovo-dita-logo-leve.jpg";
const logo = { url: logoSrc };
import openingImageSrc from "@/assets/vovo-dita-hero-bege.jpg";
const openingImage = { url: openingImageSrc };
import offerImageSrc from "@/assets/vovo-dita-oferta-leve.jpg";
const offerImage = { url: offerImageSrc };
import { ProductImage } from "@/components/product-image";
import camila from "@/assets/camila.jpg";
import juliana from "@/assets/juliana.jpg";
import beatriz from "@/assets/beatriz.jpg";

const CHECKOUT_URL = "https://pay.cakto.com.br/uio4pcd_1304273";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caderninho de Receitas da Vovó Dita para Air Fryer" },
      { name: "description", content: "150 receitas caseiras irresistíveis para Air Fryer + 30 receitas fitness de brinde. Acesso imediato." },
      { property: "og:title", content: "Caderninho de Receitas da Vovó Dita para Air Fryer" },
      { property: "og:description", content: "150 receitas caseiras + 30 fitness de brinde. O sabor da vovó, com a praticidade da Air Fryer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(openingImage.url.startsWith("https://") ? [
        { property: "og:image", content: openingImage.url },
        { name: "twitter:image", content: openingImage.url },
      ] : []),
    ],
  }),
  component: Index,
});

function CTA({ children = "QUERO GARANTIR MEU CADERNINHO AGORA", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <a
        href={CHECKOUT_URL}
        className="cta-pulse inline-flex min-h-14 w-full max-w-xl items-center justify-center rounded-2xl bg-success px-4 py-4 text-center text-base font-black uppercase leading-snug text-success-foreground transition hover:brightness-110 sm:px-6 sm:py-5 sm:text-xl"
      >
        {children}
      </a>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-bold text-muted-foreground sm:text-sm">
        <span className="flex items-center gap-1"><Check className="h-4 w-4 text-success" /> Acesso Imediato</span>
        <span className="flex items-center gap-1"><Lock className="h-4 w-4 text-success" /> Compra 100% Segura</span>
      </p>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-10">
      <p className="mb-2 text-xs font-black uppercase text-primary sm:text-sm">{kicker}</p>
      <h2 className="text-balance font-display text-2xl font-extrabold leading-tight text-secondary sm:text-4xl">{title}</h2>
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
  const [name, city] = buyers[i] ?? buyers[0] ?? ["", ""];
  const mins = (i % 6) + 1;
  return (
    <div className={`fixed bottom-5 left-5 z-40 hidden max-w-[18rem] transition-all duration-500 sm:block ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl">
        <ProductImage src={logo.url} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover object-top" />
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex sm:justify-center sm:gap-3">
      <span className="flex min-w-0 items-center gap-2 text-xs font-black uppercase sm:text-sm"><Clock className="h-4 w-4 shrink-0 text-destructive sm:h-5 sm:w-5" />Oferta expira em</span>
      <div className="flex shrink-0 items-center gap-1 font-display text-xl font-black tabular-nums sm:text-2xl">
        <span className="rounded-lg bg-destructive px-2 py-1 text-destructive-foreground">{m}</span>
        <span className="text-destructive">:</span>
        <span className="rounded-lg bg-destructive px-2 py-1 text-destructive-foreground">{s}</span>
      </div>
    </div>
  );
}

function BlackFridaySeal({ className = "" }: { className?: string }) {
  return (
    <div className={`bloom grid shrink-0 place-items-center rounded-full border-4 border-dashed border-destructive bg-[#121212] px-4 py-3 text-center shadow-xl ${className}`}>
      <div className="leading-none">
        <span className="block font-display text-base font-black uppercase tracking-tight text-destructive sm:text-lg">Black</span>
        <span className="block font-display text-base font-black uppercase tracking-tight text-white sm:text-lg">Friday</span>
        <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.2em] text-accent sm:text-xs">Novembro</span>
      </div>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(0);
  const [showMobileOffer, setShowMobileOffer] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const offer = document.getElementById("oferta");
    if (!hero || !offer) return;
    let heroVisible = true;
    let offerVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === offer) offerVisible = entry.isIntersecting;
      }
      setShowMobileOffer(!heroVisible && !offerVisible);
    });
    observer.observe(hero);
    observer.observe(offer);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="paper min-h-screen overflow-x-hidden">
      {/* Badge */}
      <div className="bg-secondary px-4 py-2.5 text-center text-xs font-extrabold leading-relaxed text-secondary-foreground sm:text-base">
        🔥 Fenômeno no Brasil: Mais de <span className="text-accent">10.000 unidades vendidas</span> nos últimos 5 dias!
      </div>

      {/* Hero */}
      <section id="inicio" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-5 pb-10 pt-6 sm:gap-10 sm:pb-16 sm:pt-10 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <span className="inline-block text-balance rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black uppercase text-primary sm:text-sm">
            O Segredo da Cozinha Prática e Saborosa
          </span>
          <h1 className="mt-4 text-balance font-display text-[1.625rem] font-black leading-[1.15] text-secondary sm:mt-5 sm:text-5xl">
            Sua Air Fryer faz sempre as <span className="text-primary">mesmas receitas</span>?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg lg:mx-0">
            Descubra novas ideias para preparar frango, batatas, petiscos, bolos, doces e refeições para a família.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base font-extrabold leading-snug text-secondary sm:text-lg lg:mx-0">
            <span className="rounded bg-accent/70 px-1 [box-decoration-break:clone]">150 receitas caseiras + 30 receitas fitness de brinde.</span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Um caderninho digital para consultar sempre que faltar inspiração na cozinha.
          </p>
          <div className="mx-auto mt-4 grid w-fit max-w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:mt-6 lg:mx-0">
            <div className="flex shrink-0">{[camila, juliana, beatriz].map((s) => <img key={s} src={s} alt="" className="-ml-2 h-8 w-8 shrink-0 rounded-full border-2 border-card object-cover first:ml-0 sm:h-9 sm:w-9" />)}</div>
            <div className="min-w-0 text-left text-xs sm:text-sm"><div className="flex text-accent">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div><span className="font-bold text-secondary">4,9/5 de +10 mil cozinheiras</span></div>
          </div>
          <CTA className="mt-6 sm:mt-8 lg:items-start" />
        </div>
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-2xl">
          <div className="float-soft relative will-change-transform">
            <ProductImage src={openingImage.url} alt="Caderninho de Receitas da Vovó Dita para Air Fryer" width={1021} height={571} fetchPriority="high" loading="eager" className="aspect-[1021/571] h-auto w-full object-contain" />
          </div>
          <div className="relative mx-auto mt-3 flex w-fit items-center gap-3">
            <BlackFridaySeal className="h-20 w-20 -rotate-6 sm:h-24 sm:w-24" />
            <div className="rounded-xl bg-accent px-3 py-2 text-center font-display text-sm font-black leading-tight text-accent-foreground shadow-lg sm:px-4 sm:text-base">
              <span className="block text-xs uppercase">de R$97</span>por R$29,90
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="gingham py-7 sm:py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 lg:grid-cols-4">
          {pillars.map(({ icon: I, t, d }) => (
            <div key={t} className="min-w-0 rounded-2xl bg-card px-3 py-4 text-center shadow-lg sm:p-5">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><I className="h-6 w-6" /></div>
              <h3 className="text-sm font-extrabold leading-snug text-secondary sm:text-base">{t}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
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
      <section className="bg-muted py-12 sm:py-20">
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
      <section className="mx-auto max-w-4xl px-5 py-12 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border-4 border-dashed border-accent bg-card px-5 py-7 text-center sm:p-12">
          <Gift className="mx-auto mb-4 h-14 w-14 text-primary" />
          <p className="text-sm font-black uppercase tracking-[0.2em] text-primary">Super bônus exclusivo</p>
          <h2 className="mt-2 text-balance font-display text-2xl font-black text-secondary sm:text-4xl">+ 30 Receitas Fitness para Air Fryer</h2>
          <p className="mt-3 text-muted-foreground">Refeições leves, gostosas e rápidas para comer sem culpa — sem abrir mão do sabor.</p>
          <p className="mt-6 font-display text-2xl font-black">
            <span className="text-muted-foreground line-through decoration-primary decoration-2">De R$ 97,00</span>{" "}
            <span className="text-success">por R$ 0,00</span>
          </p>
        </div>
      </section>

      {/* Offer */}
      <section id="oferta" className="gingham scroll-mt-4 px-4 py-12 sm:px-5 sm:py-20">
        <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] bg-card shadow-2xl">
          <div className="bg-[#121212] px-4 py-4 text-white sm:px-6"><Countdown /></div>
          <div className="px-5 py-6 text-center sm:p-9">
            <ProductImage src={offerImage.url} alt="Vovó Dita mostrando seu caderninho de receitas para Air Fryer" loading="eager" width={1000} height={914} className="mx-auto h-auto w-full max-w-sm rounded-2xl object-contain" />
            <ul className="mx-auto mt-6 space-y-3 text-left">
              {["E-book com 150 Receitas Caseiras da Vovó", "Bônus: 30 Receitas Fitness para Air Fryer", "Acesso Vitalício + Atualizações", "Leia no celular ou imprima em casa", "Garantia incondicional de 7 dias"].map((x) => (
                <li key={x} className="flex items-start gap-3 font-semibold"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success text-success-foreground"><Check className="h-4 w-4" /></span>{x}</li>
              ))}
            </ul>
            <div className="my-7 border-t-2 border-dashed border-border pt-6">
              <BlackFridaySeal className="mx-auto -mt-14 mb-4 h-24 w-24 rotate-6 sm:h-28 sm:w-28" />
              <p className="text-muted-foreground">De <span className="line-through">R$ 97,00</span> por apenas</p>
              <p className="font-display text-6xl font-black text-primary"><span className="align-top text-2xl">R$</span>29,90</p>
              <p className="text-sm font-bold text-muted-foreground">pagamento único · menos que uma pizza 🍕</p>
            </div>
            <CTA>QUERO MEU CADERNINHO AGORA</CTA>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0 text-success" /><span>Pix · Cartão · Ambiente criptografado</span></div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 py-12 text-center sm:py-20 md:flex-row md:gap-8 md:text-left">
        <div className="grid h-40 w-40 shrink-0 place-items-center rounded-full border-8 border-double border-accent bg-primary text-primary-foreground shadow-xl">
          <div className="text-center leading-none"><ShieldCheck className="mx-auto h-8 w-8" /><p className="font-display text-5xl font-black">7</p><p className="text-xs font-black uppercase tracking-widest">dias de garantia</p></div>
        </div>
        <div>
          <h2 className="font-display text-3xl font-black text-secondary">Risco Zero!</h2>
          <p className="mt-3 text-lg text-muted-foreground">Se você não se apaixonar pelas receitas e não simplificar sua vida na cozinha em até 7 dias, devolvemos 100% do seu dinheiro sem nenhuma burocracia.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-12 sm:pb-20">
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
        <ProductImage src={logo.url} alt="Vovó Dita" loading="lazy" className="mx-auto w-28 rounded-2xl" />
        <p className="mt-4 flex items-center justify-center gap-1 font-bold">Feito com <Heart className="h-4 w-4 fill-primary text-primary" /> pela Vovó Dita</p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-bold opacity-80">
          <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Site seguro</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> Garantia 7 dias</span>
          <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" /> Acesso imediato</span>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-xs opacity-60">
          Termos de Uso · Política de Privacidade. Este produto é digital (e-book em PDF). Os resultados podem variar de pessoa para pessoa. © {new Date().getFullYear()} Caderninho de Receitas da Vovó Dita. Todos os direitos reservados.
        </p>
      </footer>

      <SalesPopup />

      {showMobileOffer && <div className="mobile-offer-bar fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 px-4 pt-3 backdrop-blur-sm sm:hidden">
        <a href={CHECKOUT_URL} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-success px-4 py-3 text-center text-sm font-black uppercase text-success-foreground">
          Quero Minhas Receitas
        </a>
      </div>}
    </div>
  );
}
