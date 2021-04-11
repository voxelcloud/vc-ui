import { useState, memo } from 'react'
import t from 'prop-types'

const FormValidator = ({
  children, rules, force, value, extra, onChange,
}) => {
  const [showError, setShowError] = useState(false)

  const findError = () => {
    if (Array.isArray(rules)) {
      return rules.find(v => v?.validate(value, extra))
    }
    if (rules) {
      if (rules?.validate(value, extra)) {
        return rules
      }
    }
  }

  const error = findError()

  let childError = { showError: force ? true : showError }

  if (error) {
    childError = {
      ...childError, isError: true, helperText: error?.text || error?.helperText, ...error,
    }
  }

  const handleChange = (e, ...restArgs) => {
    setShowError(true)
    typeof onChange === 'function' && onChange(e, ...restArgs)
  }

  if (typeof children === 'function') {
    return children(handleChange, childError)
  }

  return null
}

/**
 * rules 示范
 * [{
 *    text: '用户名是必填项',
 *    validate: value => ['', undefined, null].includes(value),
 * }]
 */

FormValidator.propTypes = {
  rules: t.any,
  force: t.bool,
  extra: t.object,
  onChange: t.func,
  value: t.any,
}

FormValidator.defaultProps = {
  rules: [], // 校验规则
  force: false, // 是否强制校验
  extra: {},
  onChange: () => {},
  value: undefined
}

FormValidator.displayName = 'VcFormValidator'

// export default memo(FormValidator)
export default FormValidator
