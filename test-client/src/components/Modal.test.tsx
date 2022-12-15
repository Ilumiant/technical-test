import { render, screen } from "@testing-library/react"
import React from "react"
import { Modal } from "./Modal"

describe('Modal', () => {
  it('should show Modal', () => {
    const title = 'Show modal'
    render(<Modal isShownModal={true} hideModal={() => {}} title={title}>
      <React.Fragment>Test</React.Fragment>
    </Modal>)

    screen.getByText(title)
  })

  it('should hide Modal', () => {
    const title = 'Hide modal'
    render(<Modal isShownModal={false} hideModal={() => {}} title={title}>
      <React.Fragment>Test</React.Fragment>
    </Modal>)

    const titleElement = screen.queryByText(title)
    expect(titleElement).toBeNull()
  })
})