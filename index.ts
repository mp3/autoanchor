export default class AutoLink {

  private items: NodeList
  private html: string | null = null
  private match: RegExpMatchArray | null = null
  private index: number | undefined
  private piece: string | HTMLAnchorElement = ''

  constructor() {
    this.items = document.querySelectorAll('[data-autolink]')
    if (!this.items.length) return

    Array.from(this.items).forEach(item => this.autoLink(item as Element))
  }

  private getLinkedText(text: string) {
    const a = document.createElement('a')
    a.href = text
    a.target = '_blank'
    a.textContent = text
    return a
  }

  private autoLink(item: Element) {
    this.html = item.textContent
    if (!this.html) return
    item.textContent = ''

    while (this.html) {
      this.match = this.html.match(/(https?:\/\/(([\w\-_\.]+)\.([a-z]+))([\/\?#][^\s,,(){}<>"”’]*)?)/i)
      this.index = this.match ? this.match.index : this.html.length
      this.piece = this.html.substring(0, this.index)
      if (!this.piece && this.match) {
          this.index = this.match[1].length
          this.piece = this.getLinkedText(this.match[1])
      }
      item.textContent += this.piece
      this.html = this.html.slice(this.index)
    }
  }
}
