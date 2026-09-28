"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  DownloadSimple,
  FunnelSimple,
  GridFour,
  ListBullets,
  MagnifyingGlass,
  Package,
  Plus,
  ShoppingBag,
} from "@phosphor-icons/react";
import { WorkspaceSidebar, WorkspaceTopbar } from "./workspace-shell";
import styles from "./inventory-workspace.module.css";

const products = [
  ["Relaxed Fit Henley", "APP-204", "S-XXL", 28, "1 day"],
  ["Oversized Hoodie", "APP-318", "M-XXL", 19, "4 days"],
  ["Slim Fit Sweatpant", "APP-441", "XS-XL", 35, "3 days"],
  ["Ribbed Tank Top", "APP-783", "XS-L", 67, "1 day"],
  ["Weekend Chino", "APP-552", "28-34", 51, "2 days"],
  ["Denim Trucker Jacket", "APP-668", "S-XL", 12, "5 days"],
  ["Linen Shirt", "APP-344", "S-XL", 15, "6 days"],
  ["Cotton Jogger", "APP-457", "XS-XL", 58, "2 days"],
  ["Fleece Pullover", "APP-104", "S-XL", 31, "2 days"],
  ["Sherpa Zip-Up", "APP-511", "M-XXL", 8, "7 days"],
  ["Woven Sneaker", "SHO-102", "8-12", 26, "3 days"],
  ["Classic Crew Tee", "APP-102", "XS-XL", 42, "2 days"],
  ["Leather Belt", "ACC-204", "30-36", 39, "2 days"],
  ["Heavyweight Tee", "APP-901", "M-XXL", 24, "3 days"],
  ["Canvas Chore Pant", "APP-227", "30-34", 44, "4 days"],
] as const;

// Image bounds from the 220px-wide Figma photo frames.
const productImages = [
  ["product-18.png", 240, 359.736, 0, -80.856],
  ["product-06.png", 251, 251, -6.8, -11],
  ["product-04.png", 278, 331.654, -28.2, -14.1746],
  ["product-07.png", 221, 221, -0.4, -0.4],
  ["product-08.png", 278.011, 389.2154, -28.173, -161.7764],
  ["product-12.png", 221, 221, 0, -0.4],
  ["product-10.png", 240, 319.992, 0, -69.792],
  ["3efcf.png", 246, 246, -12.4, -25.4],
  ["product-15.png", 221, 221, -0.2, -0.4],
  ["61ef1.png", 235, 235, 0.2, -14.4],
  ["product-19.png", 240, 240, -0.2, -19.4],
  ["d34a7.png", 305, 305, -43, -65],
  ["product-20.png", 220, 221, 0.4, -0.4],
  ["product-13.png", 220, 221, 0.2, -0.4],
  ["product-11.png", 240, 319.992, 0, -97.872],
] as const;

const entries = [
  { item: { label: "Home" } },
  { item: { label: "Inbox", count: "2" } },
  { heading: "Favorites" },
  { item: { label: "Orders", dot: "#10b981", count: "34" } },
  { item: { label: "Products", dot: "#ec4899" } },
  { item: { label: "Customers", dot: "#0ea5e9" } },
  { heading: "Work" },
  { item: { label: "Content", dot: "#f5ae00" } },
  { item: { label: "Finance", dot: "#635bff" } },
  { item: { label: "Marketing", dot: "#ff6b00" } },
  { item: { label: "Analytics", dot: "#ff3040" } },
  { item: { label: "Discounts", dot: "#ad46ff" } },
];

export function InventoryWorkspace() {
  const [query, setQuery] = useState("");
  const [grid, setGrid] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const visible = useMemo(
    () => products.filter((p) => `${p[0]} ${p[1]}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const announce = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <div className={styles.app} aria-label="Forma Supply inventory workspace">
      <WorkspaceSidebar
        active="Products"
        entries={entries}
        organization="Forma Supply Co."
        businessLogo="/assets/figma/logos/Logo-Forma.png"
        onNavigate={(label) => announce(`${label} opened in this preview`)}
        onMessage={announce}
      />
      <main className={styles.main}>
        <WorkspaceTopbar
          title="Products"
          icon={<Package size={15} />}
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen((value) => !value)}
          onMessage={announce}
        />
        <section className={styles.summary}>
          <div className={styles.metrics}>
            {[
              ["Total Products", "1,248", "+4.2%", false],
              ["Total Revenue", "$83,920.12", "+12.5%", false],
              ["Total Orders", "142", "-1.4%", true],
              ["Customers", "3,420", "+2.1%", false],
            ].map(([label, value, delta, negative]) => (
              <div className={styles.metric} key={String(label)}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small className={negative ? styles.negative : ""}>
                  {delta} <i>Last 7d</i>
                </small>
              </div>
            ))}
            <button className={styles.shopify} onClick={() => announce("Shopify is connected")}>
              🛍️ <b>shopify</b>
              <span>Connected</span>
            </button>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.leftTools}>
              <label>
                <MagnifyingGlass size={14} />
                <input
                  ref={input}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products"
                />
              </label>
              <button onClick={() => announce("Product filters opened")}>
                <FunnelSimple size={14} /> Filter
              </button>
              <div className={styles.viewToggle}>
                <button
                  className={!grid ? styles.selected : ""}
                  onClick={() => setGrid(false)}
                  aria-label="List view"
                  aria-pressed={!grid}
                >
                  <ListBullets size={14} />
                </button>
                <button
                  className={grid ? styles.selected : ""}
                  onClick={() => setGrid(true)}
                  aria-label="Grid view"
                  aria-pressed={grid}
                >
                  <GridFour size={14} />
                </button>
              </div>
            </div>
            <div className={styles.actions}>
              <button onClick={() => announce("Product export prepared")}>
                Export <DownloadSimple size={14} />
              </button>
              <button onClick={() => announce("New product form opened")}>
                <Plus size={12} /> Add product
              </button>
            </div>
          </div>
        </section>
        <section className={`${styles.catalog} ${grid ? "" : styles.list}`} aria-live="polite">
          {visible.map((product) => {
            const index = products.indexOf(product);
            const [photo, width, height, left, top] = productImages[index];
            const days = Number(product[4].split(" ")[0]);
            const restockStyle =
              days <= 2 ? styles.urgent : days <= 4 ? styles.warning : days <= 6 ? styles.healthy : styles.cool;
            return (
              <button className={styles.card} key={product[1]} onClick={() => announce(`${product[0]} selected`)}>
                <span className={styles.photo}>
                  <Image
                    src={`/assets/figma/forma/${photo}`}
                    alt=""
                    width={width}
                    height={height}
                    style={{
                      width: `${width / 2.2}%`,
                      height: `${height / 2.2}%`,
                      left: `${left / 2.2}%`,
                      top: `${top / 2.2}%`,
                    }}
                    sizes="220px"
                  />
                </span>
                <span className={styles.cardBody}>
                  <strong>{product[0]}</strong>
                  <span className={styles.meta}>
                    <span>SKU: {product[1]}</span>
                    <span>{product[2]}</span>
                  </span>
                  <span className={styles.tags}>
                    <em>{product[3]} units</em>
                    <em className={restockStyle}>Restock {product[4]}</em>
                  </span>
                </span>
              </button>
            );
          })}
          {!visible.length && (
            <div className={styles.empty}>
              <ShoppingBag size={24} />
              <strong>No products found</strong>
              <span>Try another product name or SKU.</span>
            </div>
          )}
        </section>
      </main>
      {notice && (
        <div className={styles.toast} role="status">
          <Check size={13} />
          {notice}
        </div>
      )}
    </div>
  );
}
