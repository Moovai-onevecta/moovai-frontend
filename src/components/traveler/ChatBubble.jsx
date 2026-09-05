function ChatBubble({ align = 'left', tone = 'accent', children }) {
  const classes = [
    'tv-bubble',
    align === 'right' ? 'tv-bubble--right' : 'tv-bubble--left',
    tone === 'dark-soft' ? 'tv-bubble--dark-soft' : 'tv-bubble--accent',
  ].join(' ')

  return <div className={classes}>{children}</div>
}

export default ChatBubble
