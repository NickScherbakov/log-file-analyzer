import { useCallback, useState } from 'react'
import { Card } from '@/components/ui/card'
import { UploadSimple } from '@phosphor-icons/react'
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
        'border-2 border-dashed transition-all duration-200 cursor-pointer',
        'hover:border-accent hover:bg-accent/5',
        isDragging && 'border-accent bg-accent/10',
        disabled && 'opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent'
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <UploadSimple 
          className={cn(
            'mb-4 transition-colors',
            isDragging ? 'text-accent' : 'text-muted-foreground'
          )} 
          size={48} 
        />
        <h3 className="text-lg font-medium mb-2">
          {isDragging ? 'Drop your log file here' : 'Upload Log File'}
        </h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop or click to select a .log or .txt file
        </p>
      </div>
    </Card>
  )
}
