import { ReactNode } from "react"

type Props = {
  children: ReactNode
}
type RowProps = {
  children: ReactNode,
  isActive?: boolean
}

const Table = ({ children }: Props) => {
  return (
    <table className="table">
      { children }
    </table>
  )
}

const Header = ({ children }: Props) => {
  return (
    <thead className="table-header">
      { children }
    </thead>
  )
}

const Body = ({ children }: Props) => {
  return (
    <tbody className="table-body">
      { children }
    </tbody>
  )
}

const Row = ({ children, isActive }: RowProps) => {
  return (
    <tr className={isActive ? 'active-row' : ''} role='row'>
      { children }
    </tr>
  )
}

Table.Header = Header
Table.Body = Body
Table.Row = Row

export {
  Table
}
