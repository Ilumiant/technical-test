import { render, screen } from "@testing-library/react"
import { Navbar } from "./Navbar"

it('renders well', () => {
  render(<Navbar />)
  const navbarText = screen.getByText(/Technical test/)
  expect(navbarText).toBeInTheDocument()
})
