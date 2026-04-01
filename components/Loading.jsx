export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-5">
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid var(--border-ghost)' }}
        />
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: '2px solid transparent',
            borderTopColor: 'var(--violet)',
            borderRightColor: 'var(--cyan)',
          }}
        />
      </div>
      <p
        className="text-xs font-ui tracking-widest uppercase animate-pulse"
        style={{ color: 'var(--text-muted)' }}
      >
        Loading...
      </p>
    </div>
  );
}