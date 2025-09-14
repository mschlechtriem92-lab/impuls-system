import styles from "@/styles/ElementSymbols.module.css"

const elements = [
  { name: "Erde", symbol: "🜃", color: "#8B5E3C" },
  { name: "Wasser", symbol: "🜄", color: "#3C8BB5" },
  { name: "Feuer", symbol: "🜂", color: "#D94F2A" },
  { name: "Wind", symbol: "🜁", color: "#A0D8D8" },
  { name: "Spiegel", symbol: "🪞", color: "#BBA0E0" }
]

export default function ElementSymbols() {
  return (
    <div className={styles.container}>
      {elements.map((el) => (
        <div key={el.name} className={styles.symbol} style={{ borderColor: el.color }}>
          <span className={styles.icon}>{el.symbol}</span>
          <span className={styles.label}>{el.name}</span>
        </div>
      ))}
    </div>
  )
}
