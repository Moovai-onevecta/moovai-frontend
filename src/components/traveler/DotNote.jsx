function DotNote({ dot, title, note, titleColor = 'var(--tv-ink)', noteColor = 'var(--tv-muted)' }) {
  return (
    <div className="tv-row" style={{ gap: 11, alignItems: 'flex-start' }}>
      <span style={{ width: 8, height: 8, marginTop: 6, flex: 'none', borderRadius: '50%', background: dot }} />
      <div style={{ flex: '1 1 0' }}>
        <p style={{ margin: '0 0 3px', font: "600 14px/1.3 'Inter',sans-serif", color: titleColor }}>{title}</p>
        {note && <p style={{ margin: 0, font: "400 13px/1.4 'Inter',sans-serif", color: noteColor }}>{note}</p>}
      </div>
    </div>
  )
}

export default DotNote
