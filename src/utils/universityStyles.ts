export const getUniversityStyle = (name: string) => {
  const styles: Record<string, { bg: string, pattern: string, logoClass?: string }> = {
    'UTDT': {
      bg: 'bg-[#f0f0f0] dark:bg-[#1a1a1a]',
      pattern: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.05) 0%, transparent 50%), linear-gradient(45deg, rgba(0,0,0,0.02) 25%, transparent 25%)'
    },
    'UCEMA': {
      bg: 'bg-[#eef2ff] dark:bg-[#1e1b4b]',
      pattern: 'linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(99,102,241,0.05) 1px, transparent 1px)'
    },
    'ITBA': {
      bg: 'bg-[#f0fdfa] dark:bg-[#064e3b]',
      pattern: 'repeating-linear-gradient(45deg, rgba(20,184,166,0.05) 0px, rgba(20,184,166,0.05) 1px, transparent 1px, transparent 10px)'
    },
    'UdeSA': {
      bg: 'bg-[#fffbeb] dark:bg-[#451a03]',
      pattern: 'radial-gradient(circle at 70% 20%, rgba(217,119,6,0.1) 0%, transparent 40%), radial-gradient(circle at 30% 80%, rgba(217,119,6,0.1) 0%, transparent 40%)'
    },
    'Austral': {
      bg: 'bg-[#fdf2f2] dark:bg-[#450a0a]',
      pattern: 'linear-gradient(135deg, rgba(220,38,38,0.05) 25%, transparent 25%, transparent 50%, rgba(220,38,38,0.05) 50%, rgba(220,38,38,0.05) 75%, transparent 75%, transparent)'
    },
    'UBA': {
      bg: 'bg-[#f8fafc] dark:bg-[#0f172a]',
      pattern: 'linear-gradient(to right, rgba(71,85,105,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.05) 1px, transparent 1px)'
    }
  }

  const fallback = {
    bg: 'bg-warm-cream dark:bg-[#1a1814]',
    pattern: 'radial-gradient(#1a1208 1px, transparent 1px)'
  }

  const key = Object.keys(styles).find(k => name.includes(k))
  return key ? styles[key] : fallback
}
