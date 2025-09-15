export interface iVogelArticle {
  title: string
  description: string
  icon?: string
  styles?: {
    size?: string
    position?: 'unset' | 'absolute'
    sizeOffset?: string
    marginOffset?: string
    positionNested?: boolean
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  image?: string
  image_extension?: string
  image_description?: string
}

export interface iVogel {
  id: number
  name: string
  position: string
  theme: string
  themeColor: string
  size: string
  weight: string
  data: iVogelArticle[]
}

interface iVogelParsed extends iVogel {
  imgSrc: string
}
