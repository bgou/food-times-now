const data = require("../src/mock/data");
const fs = require("fs");
const clonedeep = require('lodash/clonedeep')

const template_lunch_menu = {
  title: "小食代 2019-01-21 菜单",
  menu_image: "",
  subtitle:
    "CoCo8:30截单噢. 新品#金针菇番茄鱼#  明天上线啦～冷冷的天吃番茄锅酸酸甜甜点最保暖啦～～ 周二CoCo奶茶限时一天提供珍珠. 想喝珍珠奶茶的亲不要错过啦. Roasted Milk Tea 烤奶茶也可以加珍珠3Guys/2Ladies都有噢. 冉记的新品芋泥盒子/草莓班戟又卖完啦，明天继续补货哦. ",
  menu_id: "7a194831-37ce-4a3b-a158-47b34d2d9c94",
  menu_date: "2019-01-28",
  expire_time: "2019-01-29",
  menu_items: [
    {
      name: "粉蒸牛肉",
      price: 12.65,
      status: "SOLD_OUT|AVAILABLE|LIMITED",
      limit_count: "10",
      entree_image:
        "https://www.jotform.com/uploads/foodtimes/form_files/49C30733-3CE9-4462-9FC3-319EBB5099B0.5c462080bd0690.19942212.jpeg",
      options: [
        {
          category: "主食",
          max_choices: 1,
          default_selection: 0,
          choices: [
            {
              name: "白饭",
              price: 0
            },
            {
              name: "糙饭",
              price: 1.00
            },
            {
              name: "白饭加量",
              price: 1.00
            }
          ]
        },
        {
          category: "加菜",
          max_choices: 2,
          default_selection: 0,
          choices: [
            {
              name: "无",
              price: 0
            },
            {
              name: "粉蒸牛肉",
              price: 4.00
            },
            {
              name: "梅菜扣肉",
              price: 4.00
            },
            {
              name: "金针菇番茄鱼",
              price: 4.50
            },
            {
              name: "回锅肉",
              price: 4.50
            },
            {
              name: "黄焖鸡",
              price: 4.50
            }
          ]
        }
      ]
    }
  ]
};

const generate = () => {
  const lunch_menu = clonedeep(template_lunch_menu)
  lunch_menu.menu_items = data.menuOptions.map(old_menu => {
    const menu_item = clonedeep(template_lunch_menu.menu_items[0])
    if (old_menu.name) {
      console.log(old_menu.name)
      menu_item.name = old_menu.name
      menu_item.entree_image = old_menu.imgSrc
      return menu_item
    }
    return null
  }).filter(item => item !== null);
  
  const res = [lunch_menu]
  const output_path = './src/mock/generated_data.json'
  if (!fs.existsSync(output_path)) {
    console.log(`file doesn't exist`)
  }
  fs.writeFileSync(output_path, JSON.stringify(res, null, '  '))
};

generate();
