module.exports = {
  formater: (text = '', ...args) => {
    let result = text
    let data = args && args.length === 1 && args instanceof Array ? args[0] : args
    data = !(data instanceof Object) ? [ data ] : data
    if (!/{.*?}/ig.test(result) || !data) return result

    if (/{.+?}/ig.test(result)) {
      for (const arr of result.match(/{.+?}/ig)) {
        let reg = /{(?<id>.+?)}/ig.exec(arr)
        if (!reg || !reg.groups.id || !data[reg.groups.id]) continue

        result = result.replace(arr, data[reg.groups.id])
      }
    }

    return result
  }
}
