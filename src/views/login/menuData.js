const menuData = [
  {
    name: 'Dashboard',
    src: '/dashboard',
    href: '/dashboard'
  },
  {
    name: '表格',
    href: '',
    children: [
      {name: '表格自动滚动', src: '/table/tableAutoScroll', href: '/tableAutoScroll'},
      {name: 'showTable', src: '/table/showTable', href: '/showTable'}
    ]
  }
]

export {menuData}