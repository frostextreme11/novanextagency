import React from "react";

// Custom MDX components with full GFM table support
export const mdxComponents = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className="text-3xl md:text-4xl font-display font-bold text-white mt-10 mb-6"
            {...props}
        />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className="text-2xl md:text-3xl font-display font-bold text-white mt-10 mb-4 pb-2 border-b border-white/10"
            {...props}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className="text-xl md:text-2xl font-display font-semibold text-white mt-8 mb-3"
            {...props}
        />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className="text-slate-300 leading-relaxed mb-5 text-base md:text-lg"
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="text-primary hover:text-primary-glow underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
        />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside space-y-2 mb-5 text-slate-300 ml-4" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside space-y-2 mb-5 text-slate-300 ml-4" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="text-slate-300 leading-relaxed" {...props} />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-primary/50 pl-6 py-4 my-6 bg-primary/5 rounded-r-xl"
            {...props}
        />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="bg-white/10 text-primary-glow px-2 py-0.5 rounded-md text-sm font-mono"
            {...props}
        />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
        <pre
            className="bg-black/50 border border-white/10 rounded-xl p-6 overflow-x-auto mb-6 text-sm"
            {...props}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="overflow-x-auto my-8 rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl">
            <table className="w-full border-collapse text-left text-sm" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead className="bg-white/[0.06] border-b border-white/10" {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody className="divide-y divide-white/5" {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="hover:bg-white/[0.04] transition-colors" {...props} />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="p-3.5 sm:p-4 text-white font-display font-bold text-xs sm:text-sm tracking-wide border-b border-white/10"
            {...props}
        />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td className="p-3.5 sm:p-4 text-slate-300 leading-relaxed text-xs sm:text-sm" {...props} />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="text-white font-semibold" {...props} />
    ),
    em: (props: React.HTMLAttributes<HTMLElement>) => (
        <em className="text-slate-200 italic" {...props} />
    ),
    hr: () => <hr className="border-white/10 my-10" />,
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="rounded-xl my-6 w-full" alt={props.alt || ""} {...props} />
    ),
};
