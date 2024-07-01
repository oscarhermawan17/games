import { default as i1 } from "../../assets/Card Image/01.jpeg"
import { default as i2 } from "../../assets/Card Image/02.jpg"
import { default as i3 } from "../../assets/Card Image/03.png"
import { default as i4 } from "../../assets/Card Image/04.jpg"
import { default as i5 } from "../../assets/Card Image/05.png"
import { default as i6 } from "../../assets/Card Image/06.jpg"
import { default as i7 } from "../../assets/Card Image/07.jpg"
import { default as i8 } from "../../assets/Card Image/08.jpg"
import { default as i9 } from "../../assets/Card Image/09.jpg"
import { default as i10 } from "../../assets/Card Image/10.jpg"
import { default as i11 } from "../../assets/Card Image/11.jpg"
import { default as i12 } from "../../assets/Card Image/12.jpg"
import { default as i13 } from "../../assets/Card Image/13.jpg"
import { default as i14 } from "../../assets/Card Image/14.jpg"
import { default as i15 } from "../../assets/Card Image/15.jpeg"
import type { CardCollection } from "./GameCardType"

export const dataStatic = () => {
  const cardDataStatic = [
    i1,
    i1,
    i2,
    i2,
    i3,
    i3,
    i4,
    i4,
    i5,
    i5,
    i6,
    i6,
    i7,
    i7,
    i8,
    i8,
    i9,
    i9,
    i10,
    i10,
    i11,
    i11,
    i12,
    i12,
    i13,
    i13,
    i14,
    i14,
    i15,
    i15,
  ]
  const data: CardCollection = {}
  let i: number = 0
  while (cardDataStatic.length > 0) {
    const getIndexRandom = Math.floor(Math.random() * cardDataStatic.length)
    data[i] = {
      id: i,
      card: cardDataStatic[getIndexRandom].toString(),
      isFlipped: false,
    }
    i++
    cardDataStatic.splice(getIndexRandom, 1)
  }
  return data
}
