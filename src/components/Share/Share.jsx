import React from 'react'

const Share = () => {
  return (
        <div
          style={{
            background: '#0000',
            height: '100vh',
            width: '100%',
          }}
        >
          <h1>I hope you like it</h1>

          <FacebookShareButton
            url={shareUrl}
            quote={'Title or jo bhi aapko likhna ho'}
            hashtag={'#portfolio...'}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>

          <TelegramShareButton
            url={shareUrl}
            quote={'Title or jo bhi aapko likhna ho'}
            hashtag={'#portfolio...'}
          >
            <TelegramIcon size={40} round={true} />
          </TelegramShareButton>
        </div>
  )
}

export default Share