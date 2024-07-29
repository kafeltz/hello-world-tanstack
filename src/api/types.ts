export interface PokemonApiResult {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface PokemonBasicInfo {
  id: number
  name: string
}