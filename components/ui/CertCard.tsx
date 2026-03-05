import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Certification } from '@/lib/data';
import { computeCertStatus, formatMonth } from '@/lib/utils';

interface CertCardProps {
  cert: Certification;
}

const STATUS_CONFIG = {
  valid: {
    label: 'Valid',
    className: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    className: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
  },
  expired: {
    label: 'Expired',
    className: 'bg-destructive/20 text-destructive border-destructive/30',
  },
  'no-expiry': {
    label: 'No Expiry',
    className: 'bg-muted text-muted-foreground border-border',
  },
} as const;

export function CertCard({ cert }: CertCardProps) {
  const status = computeCertStatus(cert.expiresOn);
  const config = STATUS_CONFIG[status];

  return (
    <Card className="border-border/60 hover:border-border transition-colors">
      <CardContent className="pt-5 pb-5 px-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {cert.icon && (
              <span className="text-xl flex-shrink-0">{cert.icon}</span>
            )}
            <div>
              <p className="font-semibold text-sm text-foreground leading-tight">
                {cert.title}
              </p>
              {cert.issuer && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cert.issuer}
                </p>
              )}
            </div>
          </div>
          <Badge
            variant="outline"
            className={`text-xs shrink-0 ${config.className}`}
          >
            {config.label}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">
            {cert.issuedOn ? `Issued ${formatMonth(cert.issuedOn)}` : ''}
            {cert.expiresOn ? ` · Expires ${formatMonth(cert.expiresOn)}` : ''}
          </span>
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              View Credential →
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
