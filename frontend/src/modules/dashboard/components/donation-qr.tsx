import React from 'react'
import { useTranslation } from 'react-i18next'
import { dashboard } from '@/common/locales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QrCode, Heart, ExternalLink } from 'lucide-react'

function DonationQR() {
  const { t } = useTranslation(dashboard)

  // QR Code placeholder - em produção, você usaria uma biblioteca como qrcode.js
  const qrCodeData = 'https://pix.soscancer.org.br/doar'

  const handleCopyPix = () => {
    navigator.clipboard.writeText('pix@soscancer.org.br')
    // Aqui você poderia adicionar um toast de confirmação
  }

  return (
    <Card className="mb-8 dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
          {t('donation.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* QR Code */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25 dark:border-muted-foreground/50">
              <QrCode className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">{t('donation.scanQR')}</p>
          </div>

          {/* Informações de doação */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">{t('donation.pixTitle')}</h3>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <code className="text-sm font-mono">pix@soscancer.org.br</code>
                <Button size="sm" variant="outline" onClick={handleCopyPix} className="ml-auto">
                  {t('donation.copy')}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t('donation.description')}</p>
              <Button className="w-full" asChild>
                <a href={qrCodeData} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t('donation.donateNow')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { DonationQR }
