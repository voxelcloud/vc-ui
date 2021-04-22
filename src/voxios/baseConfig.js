const defaultConfig = {
  throwErrorMessage: true,
  invalidToken: [],
  isSuccess: (response) => {
    const { status } = response
    if (status === 200) {
      return true
    }
    return false
  },
}

export default defaultConfig
