---
sidebar_position: 1
---

# 了解API

<!-- 本文档介绍了模组开发中可用的API，您可以通过这些API来实现模组的各种功能。

## API 分类
API主要分为以下几类：   
- 游戏核心API：用于操作游戏的核心功能，如角色属性、场景管理等。 -->

模块文件Main.ts中的api参数是提供的API，您可以通过它来调用游戏的核心功能。

默认提供的是中文版的API，您可以根据需要指定英文版的API：

```ts
//选择下面的一个API类型:
//英文版API的类型
import { api as APIType } from "types/src/APIType_en"
//or中文版API的类型
import { api as APIType } from "types/src/APIType"

...

getCareerData: (api:api, state) => {
    ...
}
```

调用api的方法时，能看到该方法的类型、js doc注释。
如果没有看到js doc注释，可以点击下图的红框处的箭头来查看
![image](../static/img/了解API/before.png)
![image](../static/img/了解API/after.png)
