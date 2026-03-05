import type { SupportingDoc } from '@/lib/data';
import { getDocTypeIcon } from '@/lib/utils';

interface SupportingDocsProps {
  docs: SupportingDoc[];
}

export function SupportingDocs({ docs }: SupportingDocsProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-foreground">Supporting Docs</h2>
      <div className="space-y-2">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-card/60 px-3 py-2.5 hover:bg-muted/60 transition-colors"
          >
            <span className="text-base flex-shrink-0">
              {getDocTypeIcon(doc.type)}
            </span>
            <div className="min-w-0 flex-1">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground hover:text-primary hover:underline truncate block"
              >
                {doc.title}
              </a>
              <p className="text-xs text-muted-foreground capitalize">
                {doc.type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
