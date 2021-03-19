/**
 * 复制到剪贴板
 * @param {String} text 
 * @param {String} option { successMessage, failMessage } 
 * @returns 
 */
const copyToClipboard = function (text, option = {}) {
  const { successMessage, failMessage } = option
  return new Promise((resolve, reject) => {
    const span = document.createElement('span')
    span.style.position = 'fixed'
    span.style.top = '0'
    span.style.left = '0'
    span.style.width = '0'
    span.style.height = '0'
    span.innerText = text
    document.body.appendChild(span)
    try {
      const range = document.createRange()
      range.selectNodeContents(span)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('copy')
      resolve({
        success: true,
        message: successMessage || '成功复制到剪贴板'
      })
    } catch (err) {
      reject({
        success: false,
        message: failMessage || '该浏览器不支持复制到剪贴板'
      })
    } finally {
      document.body.removeChild(span)
    }
  })
}

export default copyToClipboard