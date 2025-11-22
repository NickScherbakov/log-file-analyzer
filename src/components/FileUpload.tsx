import { useCallback, useState } from 'react'
import { Card } from '@/components/ui/card'
import { UploadSimple, FileText } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onFileSelect: (content: string, filename: string) => void
  disabled?: boolean
}

export function FileUpload({ onFileSelect, disabled }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (file.type && !file.type.includes('text') && !file.name.endsWith('.log')) {
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        onFileSelect(content, file.name)
      }
      reader.readAsText(file)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (disabled) return

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [disabled, handleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleClick = useCallback(() => {
    if (disabled) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.log,.txt,text/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) handleFile(file)
    }
    input.click()
  }, [disabled, handleFile])

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-2 border-dashed transition-all duration-500 cursor-pointer group',
        'bg-white/5 backdrop-blur-sm',
        isDragging
          ? 'border-primary bg-primary/10 scale-[1.02] shadow-[0_0_30px_rgba(124,58,237,0.3)]'
          : 'border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-lg',
        disabled && 'opacity-50 cursor-not-allowed hover:border-white/10 hover:bg-white/5'
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex flex-col items-center justify-center py-16 px-6 text-center z-10">
        <div className={cn(
          "p-4 rounded-full bg-white/5 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/20",
          isDragging && "bg-primary/20 scale-110 animate-pulse"
        )}>
          {isDragging ? (
            <FileText className="text-primary" size={48} weight="duotone" />
          ) : (
            <UploadSimple className="text-muted-foreground group-hover:text-primary transition-colors" size={48} weight="duotone" />
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 group-hover:to-primary/70 transition-all">
          {isDragging ? 'Drop to Analyze' : 'Upload Log File'}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto group-hover:text-muted-foreground/80 transition-colors">
          Drag and drop your log file here, or click to browse. Supports .log and .txt files.
        </p>
      </div>
    </Card>
  )
}
