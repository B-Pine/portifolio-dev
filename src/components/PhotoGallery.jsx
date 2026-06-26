import React from 'react';

// A row of small, profile-sized photo thumbnails. Hovering (or focusing) a
// thumbnail reveals a popup card with a larger image, a caption, and a link
// into the relevant portfolio section.
//
// items: [{ src, alt, title, caption, linkLabel, onOpen }]
export default function PhotoGallery({ items = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map((item, i) => {
        // Bias popup alignment so edge items never clip on the sides.
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const align = isFirst
          ? 'left-0'
          : isLast
          ? 'right-0'
          : 'left-1/2 -translate-x-1/2';

        return (
          <div key={i} className="group relative">
            <button
              type="button"
              onClick={item.onOpen}
              aria-label={item.title}
              className="block w-16 h-16 rounded-xl overflow-hidden bg-surface-container ring-2 ring-primary/30 hover:ring-primary transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-primary"
            >
              <img
                src={item.src}
                alt={item.alt || item.title}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="w-full h-full object-cover object-top"
              />
            </button>

            {/* Hover/focus popup card */}
            <div
              className={
                'pointer-events-none absolute top-full mt-3 z-30 w-64 ' +
                align +
                ' opacity-0 translate-y-1 scale-95 ' +
                'group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 ' +
                'group-hover:pointer-events-auto group-focus-within:opacity-100 ' +
                'group-focus-within:translate-y-0 group-focus-within:scale-100 ' +
                'group-focus-within:pointer-events-auto transition-all duration-200 ease-out'
              }
            >
              <div className="overflow-hidden rounded-xl bg-surface-container-high ring-1 ring-outline-variant/40 shadow-2xl shadow-black/40">
                <div className="h-32 w-full bg-surface-container-lowest overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt || item.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold text-on-surface font-headline leading-snug">
                    {item.title}
                  </div>
                  {item.caption && (
                    <p className="syntax-comment text-[11px] leading-relaxed mt-1">
                      {item.caption}
                    </p>
                  )}
                  {item.linkLabel && (
                    <button
                      type="button"
                      onClick={item.onOpen}
                      className="mt-2 inline-flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-wider hover:gap-2 transition-all"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 13 }}>open_in_new</span>
                      {item.linkLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
