type articleList = {
  id: string,
  title: string
}[]
type dataList = {
  name: string,
  articleList:articleList
}
export default (data:dataList[]) => {
  return data.map(item => {
    return {
      title: item.name,
      key: item.name,
      children: item.articleList.map(i => {
        return {
          title: i.title,
          key: i.id,
          isLeaf: true
        }
      })
    }
  })
}
