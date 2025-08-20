export interface iVogelArticle {
  icon?: string
  title: string
  description: string
  image?: string
  image_description?: string
}

export interface iVogel {
  id: number
  name: string
  position: string
  sound: string
  size: string
  weight: string
  data: iVogelArticle[]
}

interface iVogelParsed extends iVogel {
  imgSrc: string
}
