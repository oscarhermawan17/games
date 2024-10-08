import { memo } from "react"
import { styled } from "@mui/system"
import type { CardProps } from "./Card.type"

const CardContent = styled("div")(({ flipped }: { flipped: boolean }) => ({
  width: "100%",
  color: "white",
  height: 100,
  borderRadius: 10,
  transformStyle: "preserve-3d",
  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  transition: "transform 0.6s",
}))

const CardFace = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  color: "#fff",
  borderRadius: "10px",
})

const CardFront = styled(CardFace)({
  backgroundColor: "#ff6f61",
  cursor: "pointer",
})

const CardBack = styled(CardFace)({
  backgroundColor: "#ccc",
  overflow: "hidden",
  transform: "rotateY(180deg)",
})

const Card = ({ id, card, isFlipped, openCardClick }: CardProps) => {
  return (
    <CardContent
      onClick={() => (isFlipped ? undefined : openCardClick(id))}
      flipped={isFlipped}
    >
      <CardFront></CardFront>
      <CardBack>
        <img
          src={card}
          style={{
            minWidth: "100%",
            minHeight: "100%",
          }}
          alt={"image"}
          loading="lazy"
        />
      </CardBack>
    </CardContent>
  )
}

export default memo(Card)
