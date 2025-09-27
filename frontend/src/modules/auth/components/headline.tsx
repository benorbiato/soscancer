import { useTranslation } from 'react-i18next'

function Headline() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <h1 className="font-bold text-2xl">{t('loginTitle')}</h1>
          </div>
          <h1 className="text-gray-500 text-sm">{t('loginSubtitle')}</h1>
        </div>
      </div>
    </div>
  )
}

export { Headline }
