import { useTheme } from "next-themes"
import { BsSun } from "react-icons/bs"
import { FaRegMoon } from "react-icons/fa"

export const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme()
  return (
    <button
      onClick={() => {
        if (resolvedTheme === "dark") {
          setTheme("light")
        } else {
          setTheme("dark")
        }
      }}
    >
      {resolvedTheme === "light" ? (
        <BsSun size={20} />
      ) : (
        <FaRegMoon size={20} />
      )}
    </button>
  )
}
