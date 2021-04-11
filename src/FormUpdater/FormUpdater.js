import React, {
  useState, useEffect, useImperativeHandle, memo,
} from 'react'
import t from 'prop-types'
import clsx from 'clsx'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormValidator from '../FormValidator'
import Button from '../Button'
import TextField from '../TextField'
import { useStyles } from './style'

const getFormValueByKey = (form = [], key) => {
  const item = form.find(v => v.key === key)
  return item && item.value
}

const createForm = (fields = [], initialValue) => {
  return fields.map(v => ({
    key: v.key,
    value: getFormValueByKey(initialValue, v.key) || '',
  }))
}

/**
 * 校验表单是否合法
 * @param {*} data
 * @param {*} formMeta
 */
export const validateForm = (form = [], fields = []) => {
  const invalid = form.some((item) => {
    const { key, value } = item
    const meta = fields.find(v => v.key === key)
    if (!meta || !meta.required || !meta.rules) {
      return false
    }
    if (Array.isArray(meta.rules)) {
      const incorrect = meta.rules.some(v => typeof v.validate === 'function' && v.validate(value, { data: form }))
      return incorrect
    }
    if (typeof meta.rules.validate === 'function') {
      const incorrect = meta.rules.validate(value, { data: form })
      return incorrect
    }
    return false
  })
  return invalid === false
}

const FormUpdater = React.forwardRef(({
  initialValue, children, classes, fields, title, confirmText, onConfirm, ...restProps
}, ref) => {
  const customClasses = useStyles()
  const [form, setForm] = useState(() => createForm(fields, initialValue))
  const [open, setOpen] = useState(false)
  const content = children || <Button variant="text">更新</Button>
  const trigger = React.cloneElement(content, { onClick: () => setOpen(true) })

  const onClose = () => { setOpen(false) }

  const handleChangeForm = (key, value) => {
    setForm((state) => {
      const item = state.find(v => v.key === key)
      if (item) {
        item.value = value
      }
      return [...state]
    })
  }

  const handleConfirm = () => {
    typeof onConfirm === 'function' && onConfirm(form, fields)
  }

  useEffect(() => {
    if (!open) {
      const initialForm = createForm(fields, initialValue)
      setForm(initialForm)
    }
  }, [open, fields])

  useImperativeHandle(ref, () => ({
    close: () => {
      setOpen(false)
    },
  }))

  const buttonEnabled = validateForm(form, fields)
  return (
    <div
      className={clsx(customClasses.root, classes?.root)}
      {...restProps}
    >
      {trigger}
      { open && (
        <Dialog classes={{ root: clsx(customClasses.dialog, classes?.dialog) }} open={open} disableBackdropClick disableEscapeKeyDown onClose={onClose}>
          <DialogTitle>{title}</DialogTitle>
          <Button className="close-button" type="icon" emphasis iconName="close" onClick={onClose} />
          <DialogContent>
            {
              fields?.map((item) => {
                const formValue = getFormValueByKey(form, item.key)
                const { forceValidate, ...restItem } = item
                return (
                  <FormValidator
                    key={item.key}
                    rules={item.rules || []}
                    value={formValue}
                    extra={{ data: form }}
                    force={forceValidate}
                  >
                    {(onValidate, error = {}) => {
                      return (
                        <TextField
                          type={item.type}
                          label={item.label}
                          value={formValue}
                          name={item.key}
                          fullWidth
                          required={item.required}
                          onChange={(e) => {
                            typeof onValidate === 'function' && onValidate(e?.target?.name, e?.target?.value)
                            handleChangeForm(e?.target?.name, e?.target?.value)
                          }}
                          {...restItem}
                          error={error.showError}
                          helperText={error?.helperText || item?.helperText}
                        />
                      )
                    }}
                  </FormValidator>
                )
              })
            }
          </DialogContent>
          <DialogActions>
            <Button disabled={!buttonEnabled} className="confirm-button" variant="contained" onClick={handleConfirm}>{confirmText}</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
})

FormUpdater.defaultProps = {
  initialValue: undefined,
  title: '标题',
  classes: { root: null },
  fields: [],
  confirmText: '确认',
  onConfirm: () => { },
}

FormUpdater.propTypes = {
  children: t.any,
  classes: t.object,
  initialValue: t.array,
  fields: t.array,
  title: t.string,
  confirmText: t.string,
  onConfirm: t.func
}

export default memo(FormUpdater)
