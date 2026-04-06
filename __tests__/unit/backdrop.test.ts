import { escapeXml, generateProfileBackdrop } from '../../src/backdrop'

describe('backdrop', () => {
  describe('generateProfileBackdrop', () => {
    const defaultOptions = {
      actor: 'octocat',
      serverUrl: 'https://github.com',
      owner: 'actions',
      repo: 'attest'
    }

    it('should return a valid SVG string', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('<svg')
      expect(result).toContain('</svg>')
    })

    it('should include the actor avatar URL', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('https://github.com/octocat.png')
    })

    it('should include the actor profile link', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('href="https://github.com/octocat"')
    })

    it('should include the repository link', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('href="https://github.com/actions/attest"')
    })

    it('should include the actor name', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('octocat')
    })

    it('should include the owner/repo text', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('actions/attest')
    })

    it('should escape special XML characters in actor name', () => {
      const result = generateProfileBackdrop({
        ...defaultOptions,
        actor: 'a<b>&c'
      })
      expect(result).toContain('a&lt;b&gt;&amp;c')
      expect(result).not.toContain('>a<b>&c<')
    })

    it('should escape special XML characters in owner and repo', () => {
      const result = generateProfileBackdrop({
        ...defaultOptions,
        owner: 'own<er',
        repo: 're>po'
      })
      expect(result).toContain('own&lt;er')
      expect(result).toContain('re&gt;po')
    })

    it('should include an aria-label with the actor name', () => {
      const result = generateProfileBackdrop(defaultOptions)
      expect(result).toContain('aria-label="User profile backdrop for octocat"')
    })
  })

  describe('escapeXml', () => {
    it('should escape ampersands', () => {
      expect(escapeXml('a&b')).toBe('a&amp;b')
    })

    it('should escape less-than signs', () => {
      expect(escapeXml('a<b')).toBe('a&lt;b')
    })

    it('should escape greater-than signs', () => {
      expect(escapeXml('a>b')).toBe('a&gt;b')
    })

    it('should escape double quotes', () => {
      expect(escapeXml('a"b')).toBe('a&quot;b')
    })

    it('should escape single quotes', () => {
      expect(escapeXml("a'b")).toBe('a&#39;b')
    })

    it('should escape multiple special characters', () => {
      expect(escapeXml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      )
    })

    it('should return plain strings unchanged', () => {
      expect(escapeXml('hello world')).toBe('hello world')
    })

    it('should handle empty strings', () => {
      expect(escapeXml('')).toBe('')
    })
  })
})
