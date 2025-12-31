---
sidebar_position: 3
---

# Buff模组

## 1. Buff模组简介

Buff模组是【巨大娘的玩耍】游戏中的一种核心模组类型，用于定义游戏中各种临时数据效果。这些效果可以为角色提供属性加成、数据变化或特殊能力，通常具有持续时间或特定条件触发。

Buff模组主要包含以下功能：
- 定义Buff的基本信息（名称、描述、持续时间等）
- 实现Buff的效果逻辑（应用、更新、移除）
- 支持配置Buff的参数（如加成值、触发条件等）
- 管理Buff的生命周期

Buff模组的参考实现详见`protocols/buff-protocol/reference/`

## 2. Buff模组使用的协议

Buff模组使用的核心协议是 `buff-protocol`，该协议定义了Buff模组的服务和数据。


## 3. 模块前缀命名规范

Buff模组的名称请使用 `buff-` 作为前缀，例如：
- `buff-littleman-masochism`
- `buff-luck`



## 4. Buff协议定义

### 4.1 服务接口（ServiceType）

Buff协议的服务接口定义在 `buff-protocol/src/service/ServiceType.ts` 中：

### 4.2 数据类型（StateType）

Buff协议的数据类型定义在 `buff-protocol/src/state/StateType.ts` 中：

```typescript
import { nullable } from "types/src/ImportedTypes"

export type state = {
    //用于存储旧值，从而在移除Buff时恢复
    //也用来存储一些数据
    oldValue: nullable<any>,
    //用来计算Buff的持续时间
    startTime?: number,
    //用于存储自定义数据
    customData?: any,
}
```



## 5. 实现代码详解（src/）

### 5.1 模块化结构

Buff模组采用模块化结构设计，将不同功能分散在多个文件中：

```typescript
// 目录结构
├── Main.ts              # 主入口文件，实现服务接口
├── json/   # 数据文件夹
│   └── Data.ts          # 定义Buff数据
├── script/ # 脚本文件夹
│   ├── Event.ts         # 事件绑定和解绑
│   └── Utils.ts         # 工具函数和数据创建
└── asset/   # 资产文件夹
    └── buff.png         # Buff图标
```

### 5.2 Buff数据（Data.ts）

**多语言支持**

```typescript
export enum languageKey {
    Description,
}

let _getTextData = () => {
    return {
        [language.Chinese]: {
            [languageKey.Description]: "受虐狂"
        },
        [language.English]: {
            [languageKey.Description]: "Masochism"
        },
    }
}
```

- `languageKey`: 定义文本数据的键值枚举
- `_getTextData`: 返回多语言文本数据的函数，支持中文和英文

**Buff数据定义**

```typescript
export let getBuffData = (api: api): singleBuffData => {
    return {
        name: getName(),
        imageSrc: getImageSrc(),
        isPositive: isPositive(),
        characterType: getCharacterType(),
        maxSuperPositionCount: +Infinity,
        getDescriptionFunc: (state, superPositionCount: number, value: number) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description),
        /**
         * 应用该Buff时调用的函数
         * @param state 游戏数据
         * @param name Buff名称
         * @param usedGirl_ 应用该Buff的巨大娘（此处为null）
         * @param superPositionCount 当前叠加层数
         * @param sumValue 所有叠加层的总加成值
         */
        applyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            //将当前叠加层数保存到模组数据的oldValue，用于显示在游戏的Buff图标上
            state = api.saveBuffSuperPositionCount(api, state, getBlockName(), superPositionCount)
            return Promise.resolve(state)
        },
        /**
         * 移除Buff效果时调用的函数
         * @param state 游戏数据
         * @param name Buff名称
         * @param usedGirl_ 移除该Buff的巨大娘（此处为null）
         * @param superPositionCount 当前叠加层数
         * @param sumValue 所有叠加层的总加成值
         */
        deapplyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            //恢复模组数据的oldValue
            state = api.restoreBuffSuperPositionCount(api, state, getBlockName())
            return Promise.resolve(state)
        },
    }
}
```

**辅助函数**

```typescript
export let getName = () => "Buff_LittleMan_Masochism"

export let getCharacterType = () => characterType.LittleMan

export let isPositive = () => true

export let getImageSrc = () => `./${getBlockName()}/src/asset/buff.png`

export let getDescription = (api, state) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description)

/** 
 * 向角色添加受虐狂Buff
 * @param api 游戏API
 * @param state 游戏数据
 * @param lastTime Buff持续时间（单位：秒）
 * @param value Buff加成值
 */
export let addBuff = (api: api, state: state, lastTime, value) => {
    return api.addBuff(state, getName(), api.getLittleManName(), api.NullableUtils.getEmpty(), lastTime, 1, getCharacterType(), value)
}
```

- `getName`: 获取Buff的唯一名称
- `getCharacterType`: 指定Buff适用的角色类型
- `isPositive`: 指定Buff是否为正面效果
- `getImageSrc`: 指定Buff的图标路径
- `getDescription`: 获取Buff的描述文本

### 5.3 事件处理（Event.ts）

```typescript
let _disposeHandler = (api: api, state: state, _) => {
    //销毁时，重置数据
    state = setState(api, state, {
        ...createState(api),
    })
    return Promise.resolve(state)
}

export let bindEvent = (api: api, state) => {
    state = api.event.on(state, api.event.getDisposeEventName(), _disposeHandler)
    return state
}

export let unbindEvent = (api: api, state) => {
    state = api.event.offAll(state, api.event.getDisposeEventName())
    return state
}
```

- `bindEvent`: 绑定事件处理器
- `unbindEvent`: 解绑事件处理器
- `_disposeHandler`: 处理模组销毁事件

### 5.4 工具函数（Utils.ts）

```typescript
export let getProtocolName = () => modProtocolName.BuffProtocol
export let getBlockName = () => "buff-littleman-masochism"

export let getState = (api: api, state) => {
    return api.block.getBlockState<any>(state,
        getProtocolName(),
        getBlockName()
    )
}

export let setState = (api: api, state, s) => {
    return api.block.setBlockState(state,
        getProtocolName(),
        getBlockName(),
        s
    )
}
```

- `getProtocolName`: 获取协议名称
- `getBlockName`: 获取模组名称
- `getState`: 获取模组数据
- `setState`: 设置模组数据

### 5.5 主入口文件（Main.ts）

```typescript
import { createState, getBlockName } from "./script/Utils"
import { addBuff, getBuffData, getCharacterType, getDescription, getImageSrc, getName, isPositive } from "./json/Data"
import { bindEvent, unbindEvent } from "./script/Event"
import { service } from "buff-protocol/src/service/ServiceType"
import { state } from "buff-protocol/src/state/StateType"
import { api } from "types/src/APIType"
import { getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager } from "types/src/CommonType"
```

- `service`: Buff协议定义的服务接口类型
- `state`: Buff协议定义的数据类型
- `getBlockServiceBlockManager`: 通用类型定义，用于实现模组服务
- `createBlockStateBlockManager`: 通用类型定义，用于创建模组初始数据
- 模块化结构，将不同功能分散在Utils、Data和Event文件中


<!-- ### 5.3 Buff服务实现示例 -->

```typescript
export let getBlockService: getBlockServiceBlockManager<service> = (api) => {
    return {
        /**
         * 初始化Buff模组时调用的函数
         * @param api 游戏API
         * @param state 游戏状态
         * @returns Promise<更新后的游戏状态>
         */
        init: (api: api, state) => {
            state = bindEvent(api, state)
            return Promise.resolve(state)
        },
        /**
         * 销毁Buff模组时调用的函数
         * @param api 游戏API
         * @param state 游戏状态
         * @returns Promise<更新后的游戏状态>
         */
        dispose: (api: api, state) => {
            state = unbindEvent(api, state)
            return Promise.resolve(state)
        },

        getName: getName,
        getBuffData: getBuffData,
        addBuff: addBuff,
        getCharacterType: getCharacterType,
        isPositive: isPositive,
        getImageSrc: getImageSrc,
        getDescription: getDescription,

        getCount: (api: api, usedGirl) => (state: state) => {
            return api.getNonGiantessBuffCountBySuperPositionCount(api, state, getBlockName())
        }
    }
}
```

- 实现了`init`和`dispose`方法来绑定和解绑事件
- 使用函数分离的方式，将不同功能放在不同文件中
- 实现了`getCount`方法来获取Buff的叠加数量，用于显示在游戏的Buff图标上

<!-- ### 5.4 数据创建 -->

```typescript
export let createBlockState: createBlockStateBlockManager<state> = (api: api) => {
    return createState(api)
}

// createState函数实现（位于script/Utils.ts）
export let createState = (api: api) => {
    return {
        oldValue: api.NullableUtils.getEmpty(),
    }
}
```

- 使用`createState`函数创建初始数据
- 使用`api.NullableUtils.getEmpty()`来初始化可空字段



## 6. 开发注意事项

### 6.1 多语言支持

- 所有文本都应使用`api.getLanguageDataByData`方法获取
- 确保提供中文和英文两种语言支持



### 6.2 依赖管理

- 在`package.json->mod->dependentMods`中正确配置依赖的模组
<!-- - 确保依赖的模组版本兼容 -->

<!-- ## 7. 常见问题

### 7.1 Buff效果不生效

- 检查`package.json`中的`protocolName`是否正确设置为`buff-protocol`
- 确保Buff的`applyFunc`和`deapplyFunc`函数实现正确
- 检查Buff是否被正确应用到角色身上
- 确认Buff的`characterType`设置正确，与目标角色类型匹配

### 7.2 Buff持续时间问题

- 检查游戏中的时间系统是否正常工作
- 对于永久Buff，可以设置较大的持续时间值或在代码中特殊处理

### 7.3 Buff叠加问题

- 确保`maxSuperPositionCount`参数设置正确
- 在实现效果函数时考虑叠加层数的影响
- 使用`superPositionCount`参数来计算实际效果值

### 7.4 Buff图标不显示

- 检查`getImageSrc`函数返回的路径是否正确
- 确保图标文件存在于指定路径
- 确认文件路径使用了正确的斜杠方向（使用/而不是\） -->

---

通过以上内容，你已经了解了Buff模组的开发方法和注意事项。祝你开发顺利！