import React from 'react'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  onClose?: () => void
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  return (
    <div style={{ position: 'absolute', zIndex: 1000 }}>
      <Picker
        set="apple"
        onSelect={(emoji: any) => {
          onSelect(emoji.native)
          onClose?.()
        }}
        showPreview={false}
      />
    </div>
  )
}