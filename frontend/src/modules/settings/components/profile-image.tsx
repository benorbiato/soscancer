import { Camera } from 'lucide-react'

interface ProfileImageProps {
  profileImage: string | null
  userName?: string
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProfileImage({ profileImage, userName, onImageUpload }: ProfileImageProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white text-2xl font-bold">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Foto de perfil" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            userName?.charAt(0) || 'U'
          )}
        </div>
        <label className="absolute -bottom-2 -right-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full p-2 cursor-pointer transition-colors">
          <Camera className="h-4 w-4" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <div>
        <p className="font-medium">Foto de Perfil</p>
        <p className="text-sm text-muted-foreground">
          Clique no ícone da câmera para alterar
        </p>
      </div>
    </div>
  )
}
