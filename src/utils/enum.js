/**
 * 枚举定义类
 * 示例：
 * const STATUS = createEnum({
 *     WAIT: [1, '审核中', 'status.wait'],
 *     PASS: [2, '审核通过', 'status.pass']
 * })
 * 标识符 -> [枚举值, 描述, 国际化]
 * 获取枚举值：STATUS.WAIT 或 STATUS.getValue('WAIT')
 * 获取枚举描述：STATUS.getDesc('WAIT')
 * 通过枚举值获取描述：STATUS.getDescByValue(1)
 * 通过枚举值获取国际化id：STATUS.getIntlByValue(1)
 * 获取选项：STATUS.getOptions()
 * @param {object} definition
 */
class Enum {
  constructor(definition = {}) {
    this._definition = definition
    Object.keys(definition).forEach((key) => {
      const [value, desc, intl] = definition[key]
      this._nameToValueMap[key] = value
      this._valueToDescMap.set(value, desc)
      this._valueToIntlMap.set(value, intl)
    })
    Object.assign(this, this._nameToValueMap)
  }

  _definition = {}

  _nameToValueMap = {}

  _valueToDescMap = new Map()

  _valueToIntlMap = new Map()

  getNames() {
    return Object.keys(this._nameToValueMap)
  }

  getKeys() {
    return Object.keys(this._nameToValueMap)
  }

  getValue(name) {
    return this._nameToValueMap[name]
  }

  getValues() {
    return Object.values(this._nameToValueMap)
  }

  getNameByValue(value) {
    return Object.keys(this._nameToValueMap).find(v => this._nameToValueMap[v] === value)
  }

  getDesc(name) {
    return (this._definition[name] && this._definition[name][1]) || ''
  }

  getDescByValue(value) {
    return this._valueToDescMap.get(value) || ''
  }

  getIntl(name) {
    return (this._definition[name] && this._definition[name][2])
  }

  getIntlByValue(value) {
    return this._valueToIntlMap.get(value) || ''
  }

  getOptions() {
    return Object.keys(this._definition).map(v => ({
      name: v,
      key: v,
      value: this[v],
      desc: this.getDesc(v),
    }))
  }
}

const createEnum = (definition) => new Enum(definition)

export {
  Enum,
  createEnum
}
