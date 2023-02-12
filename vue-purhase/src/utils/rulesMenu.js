/* 
定义的筛选路由的方法
   menu 前端路由
   dyMenuList 后端路由

*/

export function rulesMenu(menu, dyMenuList) {
    //前端[{1,2,3},{2,3,4},{5,6}]  后端[{1,2},{3,4}]
    //筛选出符合后端条件的路由
    let menulist = []
    const arr = _.cloneDeep(menu)
    const arr2 = _.cloneDeep(dyMenuList)
    arr.forEach(ele1 => {
        arr2.forEach(ele2 => {
            if (ele1.meta.title === ele2.name) {
                //menulist.push(ele1)
                //注意判断是否包含children=[]
                if (ele2.children && ele2.children.length > 0) {
                    //继续比较
                    ele1.children = rulesMenu(ele1.children, ele2.children)
                }
                //添加数组
                menulist.push(ele1)

            }
        })
    })

    return menulist

}