// Matrix background effect
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrix-bg")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  // Emoji characters for the background
  const emojis = [
    "💻",
    "🔒",
    "🔑",
    "📊",
    "📈",
    "💰",
    "🛡️",
    "⚠️",
    "🔍",
    "📱",
    "💾",
    "🌐",
    "📡",
    "🔐",
    "💼",
    "📝",
    "🔗",
    "📂",
    "🔄",
    "💡",
  ]
  const fontSize = 16
  const columns = Math.floor(canvas.width / fontSize)

  // Array to track the y position of each column
  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100
  }

  function drawMatrix() {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = "rgba(10, 14, 23, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#0f0"
    ctx.font = `${fontSize}px Arial`

    for (let i = 0; i < drops.length; i++) {
      // Random emoji
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]

      // x = i * fontSize, y = value of drops[i]
      ctx.fillText(emoji, i * fontSize, drops[i] * fontSize)

      // Randomly reset some drops to top
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      // Move drop down
      drops[i]++
    }

    requestAnimationFrame(drawMatrix)
  }

  drawMatrix()

  // Create floating particles
  createParticles()

})

// Create floating particles
function createParticles() {
  const container = document.getElementById("particles-container")
  if (!container) return

  const particleCount = 5

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random position
    const posX = Math.random() * window.innerWidth
    const posY = Math.random() * window.innerHeight

    // Random size
    const size = Math.random() * 4 + 2

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1

    // Random color (cyber theme)
    const colors = ["#58CC02", "#1CB0F6", "#FF9600", "#FF4B4B", "#A560E8"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Apply styles
    particle.style.left = `${posX}px`
    particle.style.top = `${posY}px`
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.opacity = opacity
    particle.style.backgroundColor = color

    // Animation
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`
    particle.style.animationDelay = `${Math.random() * 5}s`

    // Add to container
    container.appendChild(particle)
  }

  // Add floating animation if not already added
  if (!document.getElementById("float-animation")) {
    const style = document.createElement("style")
    style.id = "float-animation"
    style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(0) translateX(20px);
                }
                75% {
                    transform: translateY(20px) translateX(10px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `
    document.head.appendChild(style)
  }
}
