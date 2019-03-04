const cart = {
  items: [
    {
      name: '粉蒸牛肉',
      price: 12.65,
      status: 'SOLD_OUT|AVAILABLE|LIMITED',
      limit_count: '10',
      entree_image:
        'https://www.jotform.com/uploads/foodtimes/form_files/49C30733-3CE9-4462-9FC3-319EBB5099B0.5c462080bd0690.19942212.jpeg',
      options: [
        {
          category: '主食',
          max_choices: 1,
          default_selection: 0,
          choices: [
            { name: '白饭', price: 12.75, is_selected: true },
            { name: '糙饭', price: 13.75 },
            { name: '白饭加量', price: 14.75 },
          ],
        },
        {
          category: '加菜',
          max_choices: 2,
          choices: [
            { name: '粉蒸牛肉', price: 4, is_selected: true },
            { name: '梅菜扣肉', price: 4, is_selected: true },
            { name: '金针菇番茄鱼', price: 4.5 },
            { name: '回锅肉', price: 4.5 },
            { name: '黄焖鸡', price: 4.5 },
          ],
        },
      ],
      id: 'fb62d9c0-f8ac-4e22-b687-d4b1d1cf5597',
      cartItemId: 'fb62d9c0-f8ac-4e22-b687-d4b1d1cf5597@0',
    },
    {
      name: '回锅肉',
      price: 12.65,
      status: 'SOLD_OUT|AVAILABLE|LIMITED',
      limit_count: '10',
      entree_image:
        'https://www.jotform.com/uploads/foodtimes/form_files/3D00D011-26BF-40C4-8750-4393DB9DEECA.5c462230a92ac1.92616033.jpeg',
      options: [
        {
          category: '主食',
          max_choices: 1,
          default_selection: 0,
          choices: [
            { name: '白饭', price: 12.75, is_selected: false },
            { name: '糙饭', price: 13.75, is_selected: true },
            { name: '白饭加量', price: 14.75 },
          ],
        },
        {
          category: '加菜',
          max_choices: 2,
          choices: [
            { name: '粉蒸牛肉', price: 4 },
            { name: '梅菜扣肉', price: 4 },
            { name: '金针菇番茄鱼', price: 4.5 },
            { name: '回锅肉', price: 4.5 },
            { name: '黄焖鸡', price: 4.5 },
          ],
        },
      ],
      id: 'b5b8c6ec-00d6-4635-94e6-e946500501d0',
      cartItemId: 'b5b8c6ec-00d6-4635-94e6-e946500501d0@1',
    },
  ],
  total: 34.5,
}

export default cart
