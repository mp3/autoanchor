export default class AutoAnchor {

  private items: NodeList
  private html: string = ''
  private match: RegExpMatchArray | null = null
  private index: number | undefined
  private piece: string | HTMLAnchorElement = ''

  constructor() {
    this.items = document.querySelectorAll('[data-autoanchor]')
    if (!this.items.length) return

    Array.from(this.items).forEach(item => this.autoAnchor(item as Element))
  }

  private getLinkedText(text: string) {
    const a = document.createElement('a')
    a.href = text
    a.target = '_blank'
    a.textContent = text
    return a
  }

  private autoAnchor(item: Element) {
    this.html = item.innerHTML
    if (!this.html) return
    item.innerHTML = ''

    while (this.html) {
      this.match = this.html.match(/(https?:\/\/(([\w\-_\.]+)\.([a-z]+))([\/\?#][^\s,,(){}<>"”’]*)?)/i)
      this.index = this.match ? this.match.index : this.html.length
      this.piece = this.html.substring(0, this.index)
      if (!this.piece && this.match) {
          this.index = this.match[1].length
          this.piece = this.getLinkedText(this.match[1])
          item.appendChild(this.piece)
      } else {
        item.innerHTML += this.piece
      }
      this.html = this.html.slice(this.index)
    }
  }
}
