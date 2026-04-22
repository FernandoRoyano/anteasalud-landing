interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Inyecta BreadcrumbList JSON-LD para que Google renderice migas de pan en la SERP.
 * No pinta nada visual — solo schema.
 *
 * Uso:
 *   <BreadcrumbSchema items={[
 *     { name: 'Inicio', url: 'https://anteasalud.com' },
 *     { name: 'Getafe', url: 'https://anteasalud.com/ejercicio-mayores-getafe' },
 *   ]} />
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
