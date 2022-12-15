import Swal, { SweetAlertIcon } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { NotePage } from './pages/notes/NotePage'

function App() {
  return (
    <NotePage />
  )
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'button-success',
    denyButton: 'button-danger',
    cancelButton: 'ml-1 button-primary'
  },
  buttonsStyling: false
})

export const showSwalErrorMessage = (text: string, title = "Error") => {
  const MySwal = withReactContent(swalWithBootstrapButtons)
  MySwal.fire({
    icon: 'error',
    title,
    text,
  })
}

export const showSwalSuccessMessage = (text: string, title = "Success") => {
  const MySwal = withReactContent(swalWithBootstrapButtons)
  MySwal.fire({
    icon: 'success',
    title,
    text,
  })
}

export const showSwalTwoOptions = async (
    title = '',
    text = '',
    icon : SweetAlertIcon | undefined = 'question',
    confirmButtonText = 'Confirmar',
    cancelButtonText = 'Cancelar',
  ) => {
  const MySwal = withReactContent(swalWithBootstrapButtons)
  return await MySwal.fire({
    icon,
    title,
    html: text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  })
}

export default App
