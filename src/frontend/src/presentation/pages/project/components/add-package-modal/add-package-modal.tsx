/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type FormEvent, useState, useEffect } from 'react'
import styles from './add-package-modal-styles.module.scss'
import Backdrop from '@mui/material/Backdrop'
import { Modal, Typography, Box, Button, Divider, TextField, MenuItem } from '@mui/material'
import InputSearch from '../../../../components/input-search/input-search'
import ListView from '../list-view/list-view'
import SalesforceService from '../../../../../data/services/salesforce-service'
// import { useNavigate } from 'react-router-dom'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  handleClose: () => void
  handleCreate: (data: any) => void
}

interface FormValues {
  name?: string
  undefined?: string
  description?: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '0',
  borderRadius: '4px',
  boxShadow: 24,
  py: '1rem'
}

const AddPackageModal: React.FC<Props> = ({ open, handleClose, handleCreate }: Props) => {
  const [step, setStep] = useState(0)
  // const navigate = useNavigate()
  const [isInvalid, setIsInvalid] = useState(false)
  const [formValues, setFormValues] = useState<FormValues | null>({
    name: '',
    undefined: '',
    description: ''
  })

  const [files, setFiles] = useState<any>([
    {
      text: '',
      file: '',
      date: ''
    }
  ])
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [filter, setFilter] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (formValues) {
      if (!formValues.name || !formValues.undefined) {
        console.error('Preencha todos os campos')
        return
      }
      
      if (formValues.undefined !== 'release' && step === 1) {
        const data = {
          text: `${formValues.undefined}/${formValues.name}`,
          description: formValues.description
        }
      handleCreate(data)
      //   console.log('submit com os arquivos')
      //   console.log(selectedFiles)
      //   console.log(formValues)
      //   const data = {
      //     differences: selectedFiles,
      //     type: formValues.undefined,
      //     name: formValues.name,
      //     description: formValues.description
      //   }
      //   const response = await SalesforceService.createPackage(data)
      //   if (response) {
      //     navigate('/project')
      //   }
      // } else {
      //   console.log('submit do release - sem arquivos')
      // }
      } else {
        console.log('submit do release - sem arquivos')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    if (e.target) {
      const { id, value } = e.target
      setFormValues(prevValues => ({
        ...prevValues,
        [id]: value
      }))
    }
  }

  const packageTypes = [
    {
      value: 'feature',
      label: 'Feature'
    },
    {
      value: 'hotfix',
      label: 'Hotfix'
    },
    {
      value: 'release',
      label: 'Release'
    }
  ]

  useEffect(() => {
    if (formValues?.name && formValues?.undefined) {
      setIsInvalid(false)
    } else {
      setIsInvalid(true)
    }
  }, [formValues])

  useEffect(() => {
    console.log(selectedFiles)
    setFiles([...files])
  }, [])

  useEffect(() => {
    const getChanges = async (): Promise<void> => {
      const response = await SalesforceService.getChanges()

      if (response) {
        const newFiles = response.differences.map(((difference: any) => {
          const file = difference.file.split('\\')
          return {
            text: file[file.length - 1] ?? '',
            file: difference.file,
            date: '21/05/2024 22:18'
          }
        }))
        setFiles(newFiles)
      }
    }

    void getChanges()
  }, [])

  return (
    
  <div cy-testid="add-pkgs-modal" className={styles.modal}>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Box sx={style}>
        <Typography sx={{ pl: '1rem', pt: '1rem' }} id="modal-title" variant="h5" component="h2">
          Criação de pacotes
        </Typography>
        <br />
        <Divider />
        <div id='modal-content' className={styles.modalContent}>
          <form
            id='modal-form'
            action=""
            onSubmit={handleSubmit}
          >
            {
              step === 0
                ? <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem', padding: '1rem' }} className={styles.formInputs}>

                  <TextField
                    onChange={handleChange}
                    value={formValues?.name ?? ''}
                    required fullWidth
                    id="name"
                    cy-testid="pkg-name-input"
                    label="Nome do Pacote"
                    variant="outlined"
                  />
                  <TextField
                    required
                    fullWidth
                    id="type"
                    cy-testid="pkg-type-input"
                    select
                    label="Tipo de pacote"
                    onChange={handleChange}
                    value={formValues?.undefined ?? ''}
                  >
                    {packageTypes.map((option) => (
                      <MenuItem cy-testid="menu-item" key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    cy-testid="pkg-description-input"
                    name="description"
                    label="Descrição do pacote"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 400 }}
                    value={formValues?.description ?? ''}
                    helperText="Breve descrição do conteúdo do pacote"
                    onChange={handleChange}
                  />
                </Box>
                : <div className={styles.files}>
                  <h2>Selecione as mudanças que devem estar no pacote.</h2>
                  <InputSearch placeholder='Pesquisar...' handleChange={(value) => { setFilter(value) }} />
                  <div className={styles.header}>
                    <p>Nome do arquivo</p>
                    <p>Ação</p>
                  </div>
                  <div className={styles.container}>
                    {files && <ListView data={files} onChange={(items) => { setSelectedFiles(items) }} filter={filter} />}
                  </div>
                </div>
            }

            <Divider />
            <Box sx={{ paddingTop: '1rem', paddingRight: '.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }} id='action-btns' className={styles.actionBtns}>
              {
                step === 1
                  ? <Button cy-testid="btn" onClick={() => { setStep(0) }} variant='text'>Voltar</Button>
                  : <Button cy-testid="btn" onClick={() => { handleClose() }} variant='text'>Cancelar</Button>
              }
              {
                formValues?.undefined !== 'release' && step !== 1
                  ? <Button
                    type='button'
                    disabled={isInvalid}
                    variant='text'
                    onClick={(e) => {
                      e.preventDefault()
                      setStep(1)
                    }}>
                    Continuar
                  </Button>
                  ? <Button cy-testid="btn" disabled={isInvalid} variant='text' onClick={() => { setStep(1) }}>Continuar</Button>
                  : <Button cy-testid="btn" type='submit' disabled={isInvalid} variant='text'>Criar Pacote</Button>
              }
            </Box>
          </form>
        </div>
      </Box>
    </Modal>
  </div >)
}

export default AddPackageModal
