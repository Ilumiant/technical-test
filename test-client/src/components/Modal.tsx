import { 
  Children,
  cloneElement,
  isValidElement,
  ReactNode
} from "react"

type ChildProps = {
  didSaveForm: () => void,
  children?: ReactNode
}

type ModalProps = {
  isShownModal: boolean,
  title: string,
  hideModal: () => void,
  children: ReactNode
}

export const Modal = ({isShownModal, hideModal, title, children}: ModalProps) => {
  return (
    <>
      
      {isShownModal && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-header">
              <div>
                {title}
              </div>
              <div className="modal-close" onClick={() => hideModal()}>
                ×
              </div>
            </div>
            <div className="modal-content">
              {Children.map(children, (child) => {
                if (
                  isValidElement<ChildProps>(child) &&
                  typeof child.type === "function"
                ) {
                  return cloneElement<ChildProps>(child, { didSaveForm: hideModal })
                }
                return child
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
