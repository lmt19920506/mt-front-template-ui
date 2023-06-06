/**
 * 数组转树结构
 * @param list 需要转成树结构的数组
 * @param rootValue 根节点名称，默认为null
 * @param pId 父节点名称，默认为parentId
 * @returns 
 */
export const transListToTreeData = (list, rootValue = null, pId = 'parentId') => {
    let arr = []
    list.forEach(item => {
        if (item[pId] === rootValue) {
            const children = transListToTreeData(list, item.id)
            if (children.length) {
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
  }